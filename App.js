import { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function openGoalInputModal() {
    setModalIsVisible(true);
  }

  function closeGoalInputModal() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    closeGoalInputModal();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={openGoalInputModal}
      />
      <GoalInput
        addGoalHandler={addGoalHandler}
        closeGoalInputModal={closeGoalInputModal}
        visible={modalIsVisible}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(goalData) => {
            return (
              <GoalItem
                text={goalData.item.text}
                id={goalData.item.id}
                deleteGoalHandler={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 6,
  },
});
