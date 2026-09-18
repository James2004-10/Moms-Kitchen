import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'qrcode';
import { RESTAURANT_INFO } from '../data/menuData';

interface QRGeneratorModalProps {
  visible: boolean;
  onClose: () => void;
}

export const QRGeneratorModal: React.FC<QRGeneratorModalProps> = ({
  visible,
  onClose,
}) => {
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [customTableName, setCustomTableName] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('https://themomskitchen.menu');

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  const activeTableLabel = customTableName.trim()
    ? customTableName.trim()
    : `Table ${selectedTable}`;

  const targetQrUrl = `${baseUrl}/?table=${encodeURIComponent(
    customTableName.trim() ? customTableName.trim() : selectedTable.toString()
  )}`;

  useEffect(() => {
    QRCode.toDataURL(
      targetQrUrl,
      {
        width: 260,
        margin: 2,
        color: {
          dark: '#18181B',
          light: '#FFFFFF',
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [targetQrUrl]);

  const handlePrint = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print QR - ${activeTableLabel} - ${RESTAURANT_INFO.name}</title>
              <style>
                @page { size: auto; margin: 20mm; }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 90vh;
                  background: #f9f9f9;
                  margin: 0;
                }
                .standee {
                  width: 340px;
                  background: #ffffff;
                  border: 2px solid #e5e7eb;
                  border-radius: 24px;
                  padding: 32px 24px;
                  text-align: center;
                  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
                }
                .logo { font-size: 38px; margin-bottom: 6px; }
                .restaurant-name { font-size: 22px; font-weight: 800; color: #18181b; margin: 0; letter-spacing: 0.5px; }
                .tagline { font-size: 11px; color: #d97706; font-weight: 600; text-transform: uppercase; margin: 4px 0 16px 0; letter-spacing: 1px; }
                .table-badge {
                  display: inline-block;
                  background: #f59e0b;
                  color: #18181b;
                  font-weight: 800;
                  font-size: 16px;
                  padding: 6px 18px;
                  border-radius: 20px;
                  margin-bottom: 16px;
                }
                .qr-img { width: 220px; height: 220px; border-radius: 12px; margin: 0 auto; display: block; }
                .instruction { font-size: 14px; font-weight: 700; color: #18181b; margin: 16px 0 4px 0; }
                .sub-instruction { font-size: 11px; color: #6b7280; margin: 0 0 16px 0; }
                .footer { border-top: 1px dashed #e5e7eb; padding-top: 12px; font-size: 10px; color: #9ca3af; line-height: 1.4; }
              </style>
            </head>
            <body>
              <div class="standee">
                <div class="logo">🍳</div>
                <h1 class="restaurant-name">${RESTAURANT_INFO.name}</h1>
                <p class="tagline">${RESTAURANT_INFO.tagline}</p>
                <div class="table-badge">${activeTableLabel.toUpperCase()}</div>
                <img class="qr-img" src="${qrDataUrl}" alt="QR Code" />
                <p class="instruction">Scan with your Camera</p>
                <p class="sub-instruction">View Digital Menu & Place Order via WhatsApp</p>
                <div class="footer">
                  ${RESTAURANT_INFO.address}<br/>
                  WhatsApp Orders: ${RESTAURANT_INFO.phone}
                </div>
              </div>
              <script>
                window.onload = () => {
                  window.print();
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      alert(`QR Code for ${activeTableLabel}: ${targetQrUrl}`);
    }
  };

  const handlePrintAll5 = async () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        const tableCards = await Promise.all(
          [1, 2, 3, 4, 5].map(async (num) => {
            const url = `${baseUrl}/?table=${num}`;
            const qrData = await QRCode.toDataURL(url, {
              width: 220,
              margin: 2,
              color: { dark: '#18181B', light: '#FFFFFF' },
            });
            return { num, qrData, url };
          })
        );

        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Print All 5 Tables - ${RESTAURANT_INFO.name}</title>
                <style>
                  @page { size: auto; margin: 15mm; }
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    background: #fff;
                  }
                  .standee-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 24px;
                  }
                  .standee {
                    width: 300px;
                    border: 2px solid #e5e7eb;
                    border-radius: 20px;
                    padding: 24px 20px;
                    text-align: center;
                    page-break-inside: avoid;
                    margin-bottom: 20px;
                  }
                  .logo { font-size: 32px; }
                  .restaurant-name { font-size: 20px; font-weight: 800; color: #18181b; margin: 4px 0 0 0; }
                  .tagline { font-size: 10px; color: #d97706; font-weight: 700; text-transform: uppercase; margin: 2px 0 12px 0; }
                  .table-badge {
                    display: inline-block;
                    background: #f59e0b;
                    color: #18181b;
                    font-weight: 800;
                    font-size: 15px;
                    padding: 5px 16px;
                    border-radius: 16px;
                    margin-bottom: 12px;
                  }
                  .qr-img { width: 180px; height: 180px; border-radius: 8px; margin: 0 auto; display: block; }
                  .instruction { font-size: 13px; font-weight: 700; color: #18181b; margin: 12px 0 2px 0; }
                  .sub-instruction { font-size: 10px; color: #6b7280; margin: 0 0 12px 0; }
                  .footer { border-top: 1px dashed #e5e7eb; padding-top: 8px; font-size: 9px; color: #9ca3af; line-height: 1.3; }
                </style>
              </head>
              <body>
                <div class="standee-container">
                  ${tableCards
                    .map(
                      (tc) => `
                    <div class="standee">
                      <div class="logo">🍳</div>
                      <h1 class="restaurant-name">${RESTAURANT_INFO.name}</h1>
                      <p class="tagline">${RESTAURANT_INFO.tagline}</p>
                      <div class="table-badge">TABLE ${tc.num}</div>
                      <img class="qr-img" src="${tc.qrData}" alt="QR Code" />
                      <p class="instruction">Scan with your Camera</p>
                      <p class="sub-instruction">View Digital Menu & Place Order via WhatsApp</p>
                      <div class="footer">
                        ${RESTAURANT_INFO.address}<br/>
                        WhatsApp Orders: ${RESTAURANT_INFO.phone}
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
                <script>
                  window.onload = () => { window.print(); };
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      } catch (err) {
        console.error(err);
      }
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
              <Text style={styles.title}>Table QR Code Generator</Text>
              <Text style={styles.subtitle}>Print or download QR codes for tables 1 to 5</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {/* Table Quick Selector */}
            <Text style={styles.sectionHeading}>Select Table (1 - 5)</Text>
            <View style={styles.tablePills}>
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = selectedTable === num && !customTableName;
                return (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.tablePill,
                      isSelected && styles.tablePillActive,
                    ]}
                    onPress={() => {
                      setSelectedTable(num);
                      setCustomTableName('');
                    }}
                  >
                    <Text
                      style={[
                        styles.tablePillText,
                        isSelected && styles.tablePillTextActive,
                      ]}
                    >
                      Table {num}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Custom Table Input */}
            <View style={styles.customBox}>
              <TextInput
                style={styles.customInput}
                placeholder="Or Custom Table / Counter (e.g. VIP 1, Rooftop 2)..."
                placeholderTextColor="#6B7280"
                value={customTableName}
                onChangeText={setCustomTableName}
              />
            </View>

            {/* Live Standee Preview Card */}
            <View style={styles.standeePreview}>
              <View style={styles.standeeCard}>
                <Text style={styles.previewLogo}>🍳</Text>
                <Text style={styles.previewRestaurantName}>
                  {RESTAURANT_INFO.name}
                </Text>
                <Text style={styles.previewTagline}>
                  {RESTAURANT_INFO.tagline}
                </Text>

                <View style={styles.previewTableBadge}>
                  <Text style={styles.previewTableBadgeText}>
                    {activeTableLabel.toUpperCase()}
                  </Text>
                </View>

                {qrDataUrl ? (
                  <Image
                    source={{ uri: qrDataUrl }}
                    style={styles.qrImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <Ionicons name="qr-code-outline" size={48} color="#9CA3AF" />
                  </View>
                )}

                <Text style={styles.previewInstruction}>
                  Scan to View Menu & Order
                </Text>
                <Text style={styles.previewSubtext}>
                  Instant WhatsApp Dispatch
                </Text>

                <Text style={styles.previewUrl} numberOfLines={1}>
                  {targetQrUrl}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.printBtn} onPress={handlePrint}>
              <Ionicons name="print-outline" size={18} color="#18181B" />
              <Text style={styles.printBtnText}>
                Print {activeTableLabel} Standee
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.printAllBtn} onPress={handlePrintAll5}>
              <Ionicons name="documents-outline" size={16} color="#F59E0B" />
              <Text style={styles.printAllBtnText}>
                Print All 5 Tables (Batch)
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#1E1E22',
    width: '100%',
    maxWidth: 460,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3F3F46',
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
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
  scrollBody: {
    maxHeight: 460,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tablePills: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 10,
  },
  tablePill: {
    backgroundColor: '#27272A',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  tablePillActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  tablePillText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  tablePillTextActive: {
    color: '#18181B',
    fontWeight: '700',
  },
  customBox: {
    marginTop: 6,
    marginBottom: 16,
  },
  customInput: {
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
  standeePreview: {
    alignItems: 'center',
    marginVertical: 10,
  },
  standeeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  previewLogo: {
    fontSize: 28,
    marginBottom: 4,
  },
  previewRestaurantName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    letterSpacing: 0.5,
  },
  previewTagline: {
    fontSize: 9,
    color: '#D97706',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  previewTableBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  previewTableBadgeText: {
    color: '#18181B',
    fontWeight: '800',
    fontSize: 13,
  },
  qrImage: {
    width: 170,
    height: 170,
    borderRadius: 8,
  },
  qrPlaceholder: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  previewInstruction: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B',
    marginTop: 10,
  },
  previewSubtext: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  previewUrl: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 8,
    maxWidth: 220,
  },
  footer: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#2D2D35',
    paddingTop: 12,
  },
  printBtn: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  printBtnText: {
    color: '#18181B',
    fontWeight: '800',
    fontSize: 14,
  },
  printAllBtn: {
    backgroundColor: '#27272A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  printAllBtnText: {
    color: '#F59E0B',
    fontWeight: '700',
    fontSize: 13,
  },
});
