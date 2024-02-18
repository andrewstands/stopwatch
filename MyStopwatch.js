import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const stop = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, time]);
  };

  const clearLap = (index) => {
    setLaps((prevLaps) => prevLaps.filter((_, i) => i !== index));
  };

  const clearLaps = () => {
    if (laps.length === 0) {
      setLaps([]);
    } else {
      Alert.alert(
        'Confirm',
        'Are you sure you want to clear all laps?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => setLaps([]) },
        ],
        { cancelable: true },
      );
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); // update every 10 milliseconds
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Format time to HH:MM:SS:mmm
  const formatTime = (time) => {
    const milliseconds = String(time % 100).padStart(2, '0');
    const seconds = String(Math.floor(time / 100) % 60).padStart(2, '0');
    const minutes = String(Math.floor(time / (100 * 60)) % 60).padStart(2, '0');
    const hours = String(Math.floor(time / (100 * 60 * 60))).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return {
    time,
    isActive,
    laps,
    start,
    pause,
    stop,
    lap,
    clearLap,
    clearLaps,
    formatTime,
  };
};

const MyStopwatch = () => {
  const {
    time,
    isActive,
    laps,
    start,
    pause,
    stop,
    lap,
    clearLap,
    clearLaps,
    formatTime,
  } = useStopwatch();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearAllLaps = () => {
    if (laps.length === 0) {
      clearLaps();
    } else {
      setConfirmClear(true);
    }
  };

  const handleConfirmClear = () => {
    clearLaps();
    setConfirmClear(false);
  };

  const handleCancelClear = () => {
    setConfirmClear(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <TouchableOpacity
        onPress={isActive ? pause : start}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stop} style={styles.button}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={lap} style={styles.button}>
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClearAllLaps} style={styles.button}>
        <Text style={styles.buttonText}>Clear All Laps</Text>
      </TouchableOpacity>
      <View style={styles.lapsContainer}>
        {laps.map((lapTime, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => clearLap(index)}
            style={styles.lapItem}
          >
            <Text style={styles.lapText}>
              Lap {index + 1}: {formatTime(lapTime)}
            </Text>
            <Text style={styles.clearLapText}>Click to Clear</Text>
          </TouchableOpacity>
        ))}
      </View>
      {confirmClear && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>
            Are you sure you want to clear all laps?
          </Text>
          <TouchableOpacity
            onPress={handleConfirmClear}
            style={[styles.button, styles.confirmButton]}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancelClear}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set background color to black
  },
  timeText: {
    fontSize: 60,
    color: '#00FF00', // Set font color to dark neon green
    fontFamily: 'monospace', // Use monospace font
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'darkgreen', // Set button background color to dark green
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white', // Set button font color to white
  },
  lapsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  lapItem: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  lapText: {
    fontSize: 16,
    color: '#00FF00', // Set lap text color to dark neon green
  },
  clearLapText: {
    fontSize: 12,
    color: 'lightgrey', // Set clear lap text color to light grey
  },
  confirmationContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'green',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default MyStopwatch;
