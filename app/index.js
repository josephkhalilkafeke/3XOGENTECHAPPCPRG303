import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [selected, setSelected] = useState('X');

  const router = useRouter();

  const startGame = () => {
    router.push({
      pathname: '/game',
      params: {
        p1: player1 || 'Player 1',
        p2: player2 || 'Player 2',
        first: selected,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3 X O Tic Tac Toe</Text>

      <TextInput
        style={styles.input}
        placeholder="Player 1"
        value={player1}
        onChangeText={setPlayer1}
      />
      <TextInput
        style={styles.input}
        placeholder="Player 2"
        value={player2}
        onChangeText={setPlayer2}
      />

      <View style={styles.choiceRow}>
        {['X', 'O'].map(c => (
          <Pressable
            key={c}
            style={[styles.choice, selected === c && styles.choiceActive]}
            onPress={() => setSelected(c)}
          >
            <Text style={{ color: selected === c ? 'white' : '#111' }}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.btn} onPress={startGame}>
        <Text style={styles.btnText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  input: { width: '80%', padding: 10, borderWidth: 1, borderRadius: 10, marginBottom: 10 },
  choiceRow: { flexDirection: 'row', gap: 10, marginVertical: 10 },
  choice: { padding: 10, borderRadius: 10, backgroundColor: '#f3f4f6', width: 50, alignItems: 'center' },
  choiceActive: { backgroundColor: '#2b6ef6' },
  btn: { marginTop: 20, padding: 14, backgroundColor: '#2b6ef6', borderRadius: 12 },
  btnText: { color: 'white', fontWeight: '600' },
});
