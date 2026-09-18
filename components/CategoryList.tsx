import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CATEGORIES } from '../data/menuData';

interface CategoryListProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategoryId,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          const count = categoryCounts[category.id] ?? 0;

          if (category.id !== 'all' && count === 0) {
            return null; // hide empty categories under current active filter
          }

          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                isSelected && styles.categoryChipSelected,
              ]}
              onPress={() => onSelectCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryName,
                  isSelected && styles.categoryNameSelected,
                ]}
              >
                {category.name}
              </Text>
              {category.id !== 'all' && count > 0 && (
                <View
                  style={[
                    styles.badge,
                    isSelected && styles.badgeSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      isSelected && styles.badgeTextSelected,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181B',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3F3F46',
    gap: 6,
  },
  categoryChipSelected: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryName: {
    fontSize: 13,
    color: '#D1D5DB',
    fontWeight: '600',
  },
  categoryNameSelected: {
    color: '#18181B',
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#3F3F46',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    marginLeft: 2,
  },
  badgeSelected: {
    backgroundColor: '#18181B',
  },
  badgeText: {
    fontSize: 10,
    color: '#D1D5DB',
    fontWeight: '600',
  },
  badgeTextSelected: {
    color: '#F59E0B',
    fontWeight: '700',
  },
});
