import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./util/calculator";

// Create class component of App
export default class App extends Component {
  state = {
    ...initialState,
    expression: "", // Added to track the expression
  };

  // Handle tap method
  HandleTap = (type, value) => {
    if (type === "number" || type === "operator") {
      this.setState((state) => ({
        ...calculator(type, value, state),
        expression: state.expression + value, // Update the expression
      }));
    } else if (type === "clear") {
      this.setState({
        ...calculator(type, value, this.state),
        expression: "", // Reset expression on clear
      });
    } else if (type === "equal") {
      this.setState((state) => ({
        ...calculator(type, value, state),
        expression: "", // Clear expression after evaluation
      }));
    } else {
      this.setState((state) => calculator(type, value, state));
    }
  };

  // Render method
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Display the current expression */}
          <Text style={styles.expression}>{this.state.expression}</Text>
          {/* Display the current value */}
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>

          {/* Calculator buttons */}
          <Row>
            <Button
              text="C"
              theme="secondary"
              onPress={() => this.HandleTap("clear")}
            />
            <Button
              text="+/-"
              theme="secondary"
              onPress={() => this.HandleTap("posneg")}
            />
            <Button
              text="%"
              theme="secondary"
              onPress={() => this.HandleTap("percentage")}
            />
            <Button
              text="/"
              theme="accent"
              onPress={() => this.HandleTap("operator", "/")}
            />
          </Row>
          <Row>
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" onPress={() => this.HandleTap("number", 9)} />
            <Button
              text="X"
              theme="accent"
              onPress={() => this.HandleTap("operator", "*")}
            />
          </Row>
          <Row>
            <Button text="4" onPress={() => this.HandleTap("number", 4)} />
            <Button text="5" onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" onPress={() => this.HandleTap("number", 6)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.HandleTap("operator", "-")}
            />
          </Row>
          <Row>
            <Button text="1" onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" onPress={() => this.HandleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.HandleTap("operator", "+")}
            />
          </Row>
          <Row>
            <Button text="0" onPress={() => this.HandleTap("number", 0)} />
            <Button text="." onPress={() => this.HandleTap("number", ".")} />
            <Button
              text="="
              theme="green"
              onPress={() => this.HandleTap("equal")}
            />
          </Row>
        </SafeAreaView>
        <Text style={styles.footerText}>Calc by Vishwajeet Koshti</Text>
      </View>
    );
  }
}

// Create styles of the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  expression: {
    color: "#fff",
    fontSize: 24,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 5,
  },
  value: {
    color: "#fff",
    fontSize: 48,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  footerText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});
