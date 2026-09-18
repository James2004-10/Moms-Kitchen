import React, { useState } from 'react';
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
import { useCart } from '../context/CartContext';

interface TableSelectModalProps {
  visible: boolean;
  onClose: () => void;
}

const TABLES = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];

export const TableSelectModal: React.FC<TableSelectModalProps> = ({
  visible,
  onClose,
}) => {
  const { tableNumber, setTableNumber, orderType, setOrderType } = useCart();
  const [customTable, setCustomTable] = useState('');

  const handleSelectTable = (tbl: string) => {
    setTableNumber(tbl);
    setOrderType('dine_in');
    onClose();
  };

  const handleTakeaway = () => {
    setOrderType('takeaway');
    onClose();
  };

  const handleCustomSubmit = () => {
    if (customTable.trim()) {
      const formatted = customTable.trim().toLowerCase().startsWith('table')
        ? customTable.trim()
        : `Table ${customTable.trim()}`;
      setTableNumber(formatted);
      setOrderType('dine_in');
      setCustomTable('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Dining Preference</Text>
              <Text style={styles.subtitle}>Select your table or takeaway option</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Service Mode Selector */}
          <View style={styles.modeRow}>
            <TouchableOpacity
              style={[
                styles.modeBtn,
                orderType === 'dine_in' && styles.modeBtnActive,
              ]}
              onPress={() => setOrderType('dine_in')}
            >
              <Ionicons
                name="restaurant-outline"
                size={18}
                color={orderType === 'dine_in' ? '#18181B' : '#9CA3AF'}
              />
              <Text
                style={[
                  styles.modeText,
                  orderType === 'dine_in' && styles.modeTextActive,
                ]}
              >
                Dine-In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeBtn,
                orderType === 'takeaway' && styles.modeBtnActive,
              ]}
              onPress={handleTakeaway}
            >
              <Ionicons
                name="bag-handle-outline"
                size={18}
                color={orderType === 'takeaway' ? '#18181B' : '#9CA3AF'}
              />
              <Text
                style={[
                  styles.modeText,
                  orderType === 'takeaway' && styles.modeTextActive,
                ]}
              >
                Takeaway / Parcel
              </Text>
            </TouchableOpacity>
          </View>

          {orderType === 'dine_in' && (
            <>
              <Text style={styles.gridHeading}>Choose Table Number</Text>
              <ScrollView style={styles.tableGridScroll} contentContainerStyle={styles.tableGrid}>
                {TABLES.map((t) => {
                  const isCurrent = tableNumber === t;
                  return (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.tableCard,
                        isCurrent && styles.tableCardActive,
                      ]}
                      onPress={() => handleSelectTable(t)}
                    >
                      <Ionicons
                        name="restaurant"
                        size={16}
                        color={isCurrent ? '#18181B' : '#F59E0B'}
                      />
                      <Text
                        style={[
                          styles.tableNumberText,
                          isCurrent && styles.tableNumberTextActive,
                        ]}
                      >
                        {t}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Custom Table Input */}
              <View style={styles.customTableBox}>
                <TextInput
                  style={styles.customInput}
                  placeholder="Or enter custom table (e.g. VIP 1)..."
                  placeholderTextColor="#6B7280"
                  value={customTable}
                  onChangeText={setCustomTable}
                  onSubmitEditing={handleCustomSubmit}
                />
                <TouchableOpacity
                  style={styles.customApplyBtn}
                  onPress={handleCustomSubmit}
                >
                  <Text style={styles.customApplyText}>Set</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {orderType === 'takeaway' && (
            <View style={styles.takeawayInfo}>
              <Ionicons name="bag-check-outline" size={40} color="#F59E0B" />
              <Text style={styles.takeawayTitle}>Takeaway Mode Active</Text>
              <Text style={styles.takeawayDesc}>
                Your order will be packed securely for pickup at the counter.
              </Text>
              <TouchableOpacity style={styles.saveTakeawayBtn} onPress={onClose}>
                <Text style={styles.saveTakeawayText}>Confirm Takeaway</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#1E1E22',
    width: '100%',
    maxWidth: 440,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3F3F46',
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#27272A',
    borderRadius: 16,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#27272A',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  modeBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  modeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  modeTextActive: {
    color: '#18181B',
  },
  gridHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  tableGridScroll: {
    maxHeight: 220,
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 10,
  },
  tableCard: {
    width: '30%',
    flexGrow: 1,
    height: 70,
    backgroundColor: '#27272A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#3F3F46',
    gap: 6,
  },
  tableCardActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  tableNumberText: {
    color: '#F9FAFB',
    fontSize: 11,
    fontWeight: '700',
  },
  tableNumberTextActive: {
    color: '#18181B',
    fontWeight: '800',
  },
  customTableBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  customInput: {
    flex: 1,
    backgroundColor: '#27272A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F9FAFB',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#3F3F46',
    outlineStyle: 'none' as any,
  },
  customApplyBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  customApplyText: {
    color: '#18181B',
    fontWeight: '700',
    fontSize: 13,
  },
  takeawayInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 10,
  },
  takeawayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  takeawayDesc: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    maxWidth: 280,
  },
  saveTakeawayBtn: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
  },
  saveTakeawayText: {
    color: '#18181B',
    fontWeight: '800',
    fontSize: 14,
  },
});
