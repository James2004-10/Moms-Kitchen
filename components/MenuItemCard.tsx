import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  onPressCustomize: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onPressCustomize,
}) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const hasCustomization =
    (item.variants && item.variants.length > 0) ||
    (item.prepTypeOptions && item.prepTypeOptions.length > 0);

  // Find occurrences in cart for simple items without variants
  const cartItem = cart.find(
    (ci) => ci.menuItem.id === item.id && !ci.variant && !ci.prepType
  );
  const totalItemCountInCart = cart
    .filter((ci) => ci.menuItem.id === item.id)
    .reduce((sum, ci) => sum + ci.quantity, 0);

  const handleAddPress = () => {
    if (hasCustomization) {
      onPressCustomize(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <View style={styles.card}>
      {/* Left Info Column */}
      <View style={styles.infoCol}>
        {/* Top Tag Row: Veg/Non-Veg + Popular */}
        <View style={styles.tagRow}>
          <View
            style={[
              styles.vegBadgeBox,
              item.isVeg ? styles.vegBorder : styles.nonVegBorder,
            ]}
          >
            <View
              style={[
                styles.vegBadgeDot,
                item.isVeg ? styles.vegDotBg : styles.nonVegDotBg,
              ]}
            />
          </View>

          {item.isPopular && (
            <View style={styles.popularBadge}>
              <Ionicons name="flame" size={10} color="#F59E0B" />
              <Text style={styles.popularText}>MUST TRY</Text>
            </View>
          )}

          {hasCustomization && (
            <View style={styles.customBadge}>
              <Text style={styles.customBadgeText}>Customisable</Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text style={styles.itemName}>{item.name}</Text>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>₹{item.basePrice}</Text>
          {hasCustomization && (
            <Text style={styles.onwardsText}>onwards</Text>
          )}
        </View>

        {/* Description */}
        {item.description && (
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>

      {/* Right Action Column */}
      <View style={styles.actionCol}>
        <View style={styles.imageThumbnail}>
          <Text style={styles.thumbnailEmoji}>{item.imageEmoji || '🍲'}</Text>
        </View>

        {/* Add Button or Stepper */}
        {!hasCustomization && cartItem ? (
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => updateQuantity(cartItem.id, -1)}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={14} color="#F59E0B" />
            </TouchableOpacity>
            <Text style={styles.stepperQty}>{cartItem.quantity}</Text>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => updateQuantity(cartItem.id, 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={14} color="#F59E0B" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.addBtn,
              hasCustomization && totalItemCountInCart > 0 && styles.addBtnHasItems,
            ]}
            onPress={handleAddPress}
            activeOpacity={0.8}
          >
            <Text style={styles.addBtnText}>
              {hasCustomization && totalItemCountInCart > 0
                ? `${totalItemCountInCart} in Cart +`
                : 'ADD +'}
            </Text>
          </TouchableOpacity>
        )}

        {hasCustomization && (
          <Text style={styles.customiseSubtext}>Customisable</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E22',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2D2D35',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCol: {
    flex: 1,
    paddingRight: 12,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  vegBadgeBox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegBorder: {
    borderColor: '#22C55E',
  },
  nonVegBorder: {
    borderColor: '#EF4444',
  },
  vegBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  vegDotBg: {
    backgroundColor: '#22C55E',
  },
  nonVegDotBg: {
    backgroundColor: '#EF4444',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B22',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
    borderWidth: 0.5,
    borderColor: '#F59E0B66',
  },
  popularText: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  customBadge: {
    backgroundColor: '#27272A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  customBadgeText: {
    color: '#9CA3AF',
    fontSize: 9,
    fontWeight: '600',
  },
  itemName: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 6,
  },
  priceText: {
    color: '#F59E0B',
    fontSize: 15,
    fontWeight: '800',
  },
  onwardsText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '500',
  },
  itemDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 16,
  },
  actionCol: {
    alignItems: 'center',
    width: 96,
    justifyContent: 'center',
  },
  imageThumbnail: {
    width: 72,
    height: 64,
    backgroundColor: '#27272A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  thumbnailEmoji: {
    fontSize: 32,
  },
  addBtn: {
    backgroundColor: '#F59E0B22',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: 88,
    alignItems: 'center',
  },
  addBtnHasItems: {
    backgroundColor: '#F59E0B33',
    borderColor: '#FBBF24',
  },
  addBtnText: {
    color: '#F59E0B',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F59E0B',
    width: 88,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    height: 32,
  },
  stepperBtn: {
    padding: 6,
  },
  stepperQty: {
    color: '#F9FAFB',
    fontWeight: '800',
    fontSize: 13,
  },
  customiseSubtext: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 3,
    fontWeight: '500',
  },
});
