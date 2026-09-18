import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedFilter: 'all' | 'veg' | 'nonveg';
  onFilterChange: (filter: 'all' | 'veg' | 'nonveg') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Bar with Branding */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.brandTitle}>{RESTAURANT_INFO.name}</Text>
            <Text style={styles.brandSubtitle}>{RESTAURANT_INFO.tagline}</Text>
          </View>
        </View>
      </View>

      {/* Address & Quick Info Banner */}
      <View style={styles.infoBanner}>
        <View style={styles.infoItem}>
          <Ionicons name="location-sharp" size={12} color="#F59E0B" />
          <Text style={styles.infoText} numberOfLines={1}>
            Villarasampatti Rd, opp. Velalar College, Erode
          </Text>
        </View>
        <View style={styles.dotSeparator} />
        <View style={styles.infoItem}>
          <Ionicons name="logo-whatsapp" size={12} color="#22C55E" />
          <Text style={styles.infoText}>93639 17296</Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search noodles, chicken, burgers, mojitos..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={onSearchChange}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearSearchBtn}>
            <Ionicons name="close-circle" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Veg / Non-Veg Quick Filter Chips */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
          onPress={() => onFilterChange('all')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'all' && styles.filterChipTextActive,
            ]}
          >
            All Items
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            styles.vegFilterChip,
            selectedFilter === 'veg' && styles.vegFilterChipActive,
          ]}
          onPress={() => onFilterChange(selectedFilter === 'veg' ? 'all' : 'veg')}
        >
          <View style={styles.vegDotBox}>
            <View style={styles.vegDot} />
          </View>
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'veg' && styles.filterChipTextActiveVeg,
            ]}
          >
            Pure Veg
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            styles.nonVegFilterChip,
            selectedFilter === 'nonveg' && styles.nonVegFilterChipActive,
          ]}
          onPress={() => onFilterChange(selectedFilter === 'nonveg' ? 'all' : 'nonveg')}
        >
          <View style={styles.nonVegDotBox}>
            <View style={styles.nonVegDot} />
          </View>
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'nonveg' && styles.filterChipTextActiveNonVeg,
            ]}
          >
            Non-Veg
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181B',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  brandTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#F9FAFB',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '600',
    letterSpacing: 0.2,
    marginTop: 1,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tableChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#27272A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  tableChipText: {
    color: '#F3F4F6',
    fontSize: 12,
    fontWeight: '700',
  },
  qrButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#27272A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#121214',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  infoText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#4B5563',
    marginHorizontal: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272A',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#F9FAFB',
    fontSize: 14,
    height: '100%',
    outlineStyle: 'none' as any,
  },
  clearSearchBtn: {
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#27272A',
    borderWidth: 1,
    borderColor: '#3F3F46',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  filterChipTextActive: {
    color: '#18181B',
    fontWeight: '700',
  },
  vegFilterChip: {
    borderColor: '#166534',
  },
  vegFilterChipActive: {
    backgroundColor: '#14532D',
    borderColor: '#22C55E',
  },
  filterChipTextActiveVeg: {
    color: '#86EFAC',
    fontWeight: '700',
  },
  nonVegFilterChip: {
    borderColor: '#991B1B',
  },
  nonVegFilterChipActive: {
    backgroundColor: '#7F1D1D',
    borderColor: '#EF4444',
  },
  filterChipTextActiveNonVeg: {
    color: '#FCA5A5',
    fontWeight: '700',
  },
  vegDotBox: {
    width: 13,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  nonVegDotBox: {
    width: 13,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  nonVegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
});
