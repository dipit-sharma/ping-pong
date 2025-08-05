import { Cell } from "@/class/Cell";
import { cW } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

class LudoGrid extends React.Component {
  render() {
    return <div>LudoGrid</div>;
  }

  static gridBottom: Cell[][] = [];
  static gridTop: Cell[][] = [];
  static gridLeft: Cell[][] = [];
  static gridRight: Cell[][] = [];

  static createGrids() {
    this.gridBottom = new Array(6).fill(
      new Array(3).fill(new Cell(0, false, false, false, 0, []))
    );
    this.gridTop = new Array(6).fill(
      new Array(3).fill(new Cell(0, false, false, false, 0, []))
    );

    this.gridLeft = new Array(3).fill(
      new Array(6).fill(new Cell(0, false, false, false, 0, []))
    );
    this.gridRight = new Array(3).fill(
      new Array(6).fill(new Cell(0, false, false, false, 0, []))
    );
  }

  static Grid1 = () => {
    if (LudoGrid.gridBottom.length === 0) {
      LudoGrid.createGrids();
    }
    return (
      <View style={styles.vGrid}>
        <View style={styles.grid1Content}>
          {LudoGrid.gridBottom.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    {cell.getGoties().map((goti, gotiIndex) => (
                      <View key={gotiIndex} style={styles.goti}>
                        {/* Render goti shape component here */}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };

  static Grid2 = () => {
    return (
      <View style={styles.vGrid}>
        <View style={styles.grid2Content}>
          {LudoGrid.gridTop.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    {cell.getGoties().map((goti, gotiIndex) => (
                      <View key={gotiIndex} style={styles.goti}>
                        {/* Render goti shape component here */}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };

  static Grid3 = () => {
    return (
      <View style={styles.hGrid}>
        <View style={styles.grid3Content}>
          {LudoGrid.gridLeft.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    {cell.getGoties().map((goti, gotiIndex) => (
                      <View key={gotiIndex} style={styles.goti}>
                        {/* Render goti shape component here */}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };

  static Grid4 = () => {
    return (
      <View style={styles.hGrid}>
        <View style={styles.grid4Content}>
          {LudoGrid.gridRight.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    {cell.getGoties().map((goti, gotiIndex) => (
                      <View key={gotiIndex} style={styles.goti}>
                        {/* Render goti shape component here */}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  vGrid: {
    width: cW * 3,
    height: cW * 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  grid1Content: {
    // Grid 1 specific styles
  },
  hGrid: {
    width: cW * 6,
    height: cW * 3,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  grid2Content: {
    // Grid 2 specific styles
  },
  grid3Content: {
    // Grid 3 specific styles
  },
  grid4Content: {
    // Grid 4 specific styles
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cW,
    height: cW,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellContent: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goti: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    margin: 1,
  },
});

export default LudoGrid;
