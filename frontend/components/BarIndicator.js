import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BarIndicator = ({ label, currentValue, minAcceptable, maxAcceptable, minValue, maxValue }) => {
  const position = ((currentValue - minValue) / (maxValue - minValue)) * 100;
  const minAcceptablePosition = ((minAcceptable - minValue) / (maxValue - minValue)) * 100;
  const maxAcceptablePosition = ((maxAcceptable - minValue) / (maxValue - minValue)) * 100;

  // Determine status based on currentValue
  let status = 'Normal';
  let statusColor = styles.currentValueNormal;

  if (currentValue < minAcceptable) {
    status = 'Low';
    statusColor = styles.currentValueLow;
  } else if (currentValue > maxAcceptable) {
    status = 'High';
    statusColor = styles.currentValueHigh;
  }

  return (
    <View style={styles.barContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.range}>Normal Range: {minAcceptable} - {maxAcceptable}</Text>
      <Text style={[styles.statusText, statusColor]}>{status}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.acceptableRange, { left: `${minAcceptablePosition}%`, width: `${maxAcceptablePosition - minAcceptablePosition + 4}%` }]} />
        <View style={[styles.currentValueIndicator, { left: `${position}%` }]}>
          {/* Apply status-based color to currentValueText */}
          <Text style={[styles.currentValueText, statusColor]}>{currentValue}</Text>
          {/* Black vertical line */}
          <View style={styles.blackVerticalLine} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    marginVertical: 15,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  range: {
    marginBottom: 4,
    fontWeight: 'normal',
  },
  statusText: {
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Color for the current value label based on status
  currentValueNormal: {
    color: 'green',
  },
  currentValueLow: {
    color: 'red',
  },
  currentValueHigh: {
    color: 'red',
  },
  barBackground: {
    height: 10,
    backgroundColor: '#FFD54F',
    borderRadius: 5,
    position: 'relative',
  },
  acceptableRange: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#81C784',
    borderRadius: 5,
  },
  currentValueIndicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  currentValueText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -20,
  },
  // Black vertical line for current value
  blackVerticalLine: {
    width: 2,
    height: 20,
    backgroundColor: 'black', // Black line for current value
    marginTop: -2,
  },
});

export default BarIndicator;
