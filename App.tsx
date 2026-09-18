import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './context/CartContext';
import {
  MENU_ITEMS,
  CATEGORIES,
  MenuItem,
  RESTAURANT_INFO,
} from './data/menuData';
import { Header } from './components/Header';
import { CategoryList } from './components/CategoryList';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartSheet } from './components/CartSheet';
import { OrderSuccessModal } from './components/OrderSuccessModal';

const MainMenu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  // Modals
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // Compute category counts for current filter & search
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MENU_ITEMS.forEach((item) => {
      // Check veg filter
      if (selectedFilter === 'veg' && !item.isVeg) return;
      if (selectedFilter === 'nonveg' && item.isVeg) return;

      // Check search
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return;
      }

      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
      counts['all'] = (counts['all'] || 0) + 1;
    });
    return counts;
  }, [searchQuery, selectedFilter]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategoryId !== 'all' && item.categoryId !== selectedCategoryId) {
        return false;
      }

      // Veg / Non-Veg filter
      if (selectedFilter === 'veg' && !item.isVeg) return false;
      if (selectedFilter === 'nonveg' && item.isVeg) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q) ?? false;
        const matchesCat = CATEGORIES.find((c) => c.id === item.categoryId)
          ?.name.toLowerCase()
          .includes(q) ?? false;
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [selectedCategoryId, selectedFilter, searchQuery]);

  // Group items by category for section display when 'all' is selected
  const categorySections = useMemo(() => {
    if (selectedCategoryId !== 'all' || searchQuery.trim()) {
      return null;
    }

    const sections: { category: (typeof CATEGORIES)[0]; items: MenuItem[] }[] = [];
    CATEGORIES.filter((c) => c.id !== 'all').forEach((cat) => {
      const itemsInCat = filteredItems.filter((i) => i.categoryId === cat.id);
      if (itemsInCat.length > 0) {
        sections.push({ category: cat, items: itemsInCat });
      }
    });
    return sections;
  }, [selectedCategoryId, searchQuery, filteredItems]);

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      "The Mom's Kitchen, Villarasampatti Road, Velalar College of Engineering, Erode"
    )}`;
    Linking.openURL(url);
  };

  const handleOpenInstagram = () => {
    Linking.openURL(`https://instagram.com/${RESTAURANT_INFO.instagram.replace('@', '')}`);
  };

  const renderFooter = () => (
    <View style={styles.restaurantFooter}>
      <View style={styles.footerBrand}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.footerLogoImage}
          resizeMode="cover"
        />
        <Text style={styles.footerTitle}>{RESTAURANT_INFO.name}</Text>
        <Text style={styles.footerTagline}>{RESTAURANT_INFO.tagline}</Text>
      </View>

      <View style={styles.footerDetailsBox}>
        <TouchableOpacity style={styles.footerItem} onPress={handleOpenMaps}>
          <Ionicons name="location-outline" size={16} color="#F59E0B" />
          <Text style={styles.footerItemText}>{RESTAURANT_INFO.address}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => Linking.openURL(`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`)}
        >
          <Ionicons name="call-outline" size={16} color="#F59E0B" />
          <Text style={styles.footerItemText}>Phone: {RESTAURANT_INFO.phone}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={handleOpenInstagram}>
          <Ionicons name="logo-instagram" size={16} color="#EC4899" />
          <Text style={styles.footerItemText}>Instagram: {RESTAURANT_INFO.instagram}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryNotice}>
        <Text style={styles.deliveryNoticeText}>🛵 Also find our foods on Zomato</Text>
      </View>

      <Text style={styles.thankYouText}>✨ THANK YOU, VISIT AGAIN! ✨</Text>
      <View style={{ height: 100 }} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.mainWrapper}>
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {/* Categories Bar */}
        <CategoryList
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          categoryCounts={categoryCounts}
        />

        {/* Dishes List */}
        {categorySections ? (
          // Grouped by categories
          <FlatList
            data={categorySections}
            keyExtractor={(sec) => sec.category.id}
            renderItem={({ item: sec }) => (
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderEmoji}>{sec.category.emoji}</Text>
                  <Text style={styles.sectionHeaderTitle}>{sec.category.name}</Text>
                  <View style={styles.sectionHeaderCountBadge}>
                    <Text style={styles.sectionHeaderCount}>{sec.items.length}</Text>
                  </View>
                </View>
                {sec.items.map((dish) => (
                  <MenuItemCard
                    key={dish.id}
                    item={dish}
                    onPressCustomize={setCustomizerItem}
                  />
                ))}
              </View>
            )}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          // Filtered list (single category or search query)
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MenuItemCard
                item={item}
                onPressCustomize={setCustomizerItem}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Ionicons name="search" size={48} color="#4B5563" />
                <Text style={styles.emptyTitle}>No dishes found</Text>
                <Text style={styles.emptySubtitle}>
                  Try clearing your search or switching filters.
                </Text>
              </View>
            )}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* Cart Bar & Slide-up Sheet */}
        <CartSheet
          onOrderSuccess={() => setIsSuccessModalVisible(true)}
        />

        {/* Item Customizer Modal */}
        <ItemCustomizerModal
          visible={!!customizerItem}
          item={customizerItem}
          onClose={() => setCustomizerItem(null)}
        />

        {/* Order Placed Success Modal */}
        <OrderSuccessModal
          visible={isSuccessModalVisible}
          onClose={() => setIsSuccessModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainMenu />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121214',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#121214',
    maxWidth: 768,
    width: '100%',
    alignSelf: 'center',
  },
  listContent: {
    paddingTop: 10,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  sectionHeaderEmoji: {
    fontSize: 18,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F9FAFB',
    letterSpacing: 0.3,
  },
  sectionHeaderCountBadge: {
    backgroundColor: '#27272A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  sectionHeaderCount: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  restaurantFooter: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#18181B',
    borderTopWidth: 1,
    borderTopColor: '#27272A',
    alignItems: 'center',
  },
  footerBrand: {
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogoImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#F59E0B',
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#F9FAFB',
    letterSpacing: 0.5,
  },
  footerTagline: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerDetailsBox: {
    width: '100%',
    backgroundColor: '#1E1E22',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#2D2D35',
    marginBottom: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  footerItemText: {
    fontSize: 12,
    color: '#D1D5DB',
    flex: 1,
    lineHeight: 18,
  },
  deliveryNotice: {
    backgroundColor: '#E2374422',
    borderWidth: 1,
    borderColor: '#E2374455',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  deliveryNoticeText: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '700',
  },
  thankYouText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
