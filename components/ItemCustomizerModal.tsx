import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem, MenuItemVariant } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface ItemCustomizerModalProps {
  visible: boolean;
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  visible,
  item,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [selectedPrep, setSelectedPrep] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<MenuItemVariant | undefined>(undefined);
  const [itemNote, setItemNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (item) {
      // Set default prep type
      if (item.prepTypeOptions && item.prepTypeOptions.length > 0) {
        setSelectedPrep(item.prepTypeOptions[0]);
      } else {
        setSelectedPrep('');
      }

      // Set default variant
      if (item.variants && item.variants.length > 0) {
        setSelectedVariant(item.variants[0]);
      } else {
        setSelectedVariant(undefined);
      }

      setQuantity(1);
      setItemNote('');
    }
  }, [item]);

  if (!item) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : item.basePrice;
  const totalPrice = currentPrice * quantity;

  const handleConfirm = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item, selectedPrep || undefined, selectedVariant, itemNote.trim() || undefined);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
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
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {/* Prep Type Options (e.g., Fried Rice or Noodles) */}
            {item.prepTypeOptions && item.prepTypeOptions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. Choose Your Base</Text>
                <View style={styles.choiceRow}>
                  {item.prepTypeOptions.map((opt) => {
                    const isSelected = selectedPrep === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        style={[
                          styles.optionPill,
                          isSelected && styles.optionPillActive,
                        ]}
                        onPress={() => setSelectedPrep(opt)}
                      >
                        <Ionicons
                          name={
                            isSelected ? 'radio-button-on' : 'radio-button-off'
                          }
                          size={16}
                          color={isSelected ? '#F59E0B' : '#6B7280'}
                        />
                        <Text
                          style={[
                            styles.optionText,
                            isSelected && styles.optionTextActive,
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Flavor / Variation Options */}
            {item.variants && item.variants.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {item.prepTypeOptions ? '2. Select Style / Flavor' : 'Choose Variation'}
                </Text>
                <View style={styles.variantList}>
                  {item.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <TouchableOpacity
                        key={v.id}
                        style={[
                          styles.variantRow,
                          isSelected && styles.variantRowActive,
                        ]}
                        onPress={() => setSelectedVariant(v)}
                      >
                        <View style={styles.variantLeft}>
                          <Ionicons
                            name={
                              isSelected
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={18}
                            color={isSelected ? '#F59E0B' : '#6B7280'}
                          />
                          <Text
                            style={[
                              styles.variantName,
                              isSelected && styles.variantNameActive,
                            ]}
                          >
                            {v.name}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.variantPrice,
                            isSelected && styles.variantPriceActive,
                          ]}
                        >
                          ₹{v.price}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Quantity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Ionicons name="remove" size={18} color="#F59E0B" />
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity((q) => q + 1)}
                >
                  <Ionicons name="add" size={18} color="#F59E0B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Cooking Instructions / Special Request */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special Request (Optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="e.g. Less spicy, extra sauce, crunchy..."
                placeholderTextColor="#6B7280"
                value={itemNote}
                onChangeText={setItemNote}
              />
            </View>
          </ScrollView>

          {/* Bottom Confirm Action */}
          <View style={styles.footer}>
            <View style={styles.priceSummary}>
              <Text style={styles.priceLabel}>Item Total</Text>
              <Text style={styles.priceValue}>₹{totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmBtnText}>Add Item to Cart</Text>
              <Ionicons name="arrow-forward" size={18} color="#18181B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1E22',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D35',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F9FAFB',
    flex: 1,
  },
  closeBtn: {
    padding: 6,
    backgroundColor: '#27272A',
    borderRadius: 20,
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
  scrollBody: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#27272A',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  optionPillActive: {
    borderColor: '#F59E0B',
    backgroundColor: '#F59E0B15',
  },
  optionText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#F59E0B',
    fontWeight: '700',
  },
  variantList: {
    gap: 8,
  },
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#27272A',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  variantRowActive: {
    borderColor: '#F59E0B',
    backgroundColor: '#F59E0B15',
  },
  variantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  variantName: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '600',
  },
  variantNameActive: {
    color: '#F9FAFB',
    fontWeight: '700',
  },
  variantPrice: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '700',
  },
  variantPriceActive: {
    color: '#F59E0B',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#27272A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  qtyNumber: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '800',
    minWidth: 24,
    textAlign: 'center',
  },
  noteInput: {
    backgroundColor: '#27272A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#F9FAFB',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#3F3F46',
    outlineStyle: 'none' as any,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D2D35',
    backgroundColor: '#18181B',
  },
  priceSummary: {},
  priceLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F59E0B',
  },
  confirmBtn: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  confirmBtnText: {
    color: '#18181B',
    fontWeight: '800',
    fontSize: 14,
  },
});
