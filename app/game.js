import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Game() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const p1 = params.p1 || 'Player 1';
  const p2 = params.p2 || 'Player 2';
  const first = params.first || 'X';

  const [turn, setTurn] = useState(first);
  const [cells, setCells] = useState(Array(9).fill(''));
  const [score, setScore] = useState({ [p1]: 0, [p2]: 0 });

  const checkWinner = board => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // columns
      [0,4,8],[2,4,6]          // diagonals
    ];

    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Cross-platform alert helper
  const showAlert = (title, message, onPress) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
      if (onPress) onPress();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress }]);
    }
  };

  const resetBoard = () => {
    setCells(Array(9).fill(''));
    setTurn(first);
  };

  const handlePress = index => {
    if (cells[index]) return; // already filled
    const newCells = [...cells];
    newCells[index] = turn;
    setCells(newCells);

    const winnerSymbol = checkWinner(newCells);
    if (winnerSymbol) {
      const winnerName = winnerSymbol === first ? p1 : p2;
      setScore(prev => ({ ...prev, [winnerName]: prev[winnerName] + 1 }));
      showAlert('Winner!', `${winnerName} wins!`, resetBoard);
      return;
    }

    if (!newCells.includes('')) {
      showAlert('Tie!', "It's a tie!", resetBoard);
      return;
    }

    setTurn(turn === 'X' ? 'O' : 'X');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{p1} vs {p2} • {turn}'s turn</Text>

      <View style={styles.board}>
        {cells.map((cell, idx) => (
          <Pressable
            key={idx}
            style={styles.cell}
            onPress={() => handlePress(idx)}
          >
            <Text style={{ fontSize: 32, fontWeight: '700', color: cell === 'X' ? '#0f172a' : '#1e40af' }}>
              {cell}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.scoreboard}>
        <Text style={styles.scoreTitle}>Scoreboard</Text>
        <Text>{p1}: {score[p1]}</Text>
        <Text>{p2}: {score[p2]}</Text>
      </View>

      <Pressable style={styles.btn} onPress={() => router.push('/')}>
        <Text style={styles.btnText}>Back Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:20, fontWeight:'700', marginBottom:20 },
  board: { width: 300, height:300, flexDirection:'row', flexWrap:'wrap' },
  cell: { width:'33.33%', height:'33.33%', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#ccc' },
  scoreboard: { marginTop:20, alignItems:'center' },
  scoreTitle: { fontWeight:'700', marginBottom:8 },
  btn: { marginTop:20, padding:14, backgroundColor:'#2b6ef6', borderRadius:12 },
  btnText: { color:'white', fontWeight:'600' },
});
