import { Cell } from "@/class/Cell";
import { cW } from "@/constants/Colors";
import { Goti as GotiInterface } from "@/interface/utils";
import { traverseEdge } from "@/utils/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Goti from "./Goti";

interface LudoGridProps {
  isGotiSelectionActive?: boolean;
  currentPlayerGoties?: GotiInterface[];
  onGotiSelect?: (goti: GotiInterface) => void;
  boardMap?: Map<number, any[]>;
}

class LudoGrid extends React.Component<LudoGridProps> {
  render() {
    return <div>LudoGrid</div>;
  }

  static gridBottom: Cell[][] = [];
  static gridTop: Cell[][] = [];
  static gridLeft: Cell[][] = [];
  static gridRight: Cell[][] = [];

  static createGrids() {
    // Initialize grids with proper Cell instances
    this.gridBottom = new Array(6)
      .fill(null)
      .map(() =>
        new Array(3)
          .fill(null)
          .map(() => new Cell(0, false, false, false, 0, []))
      );

    this.gridTop = new Array(6)
      .fill(null)
      .map(() =>
        new Array(3)
          .fill(null)
          .map(() => new Cell(0, false, false, false, 0, []))
      );

    this.gridLeft = new Array(3)
      .fill(null)
      .map(() =>
        new Array(6)
          .fill(null)
          .map(() => new Cell(0, false, false, false, 0, []))
      );
    this.gridRight = new Array(3)
      .fill(null)
      .map(() =>
        new Array(6)
          .fill(null)
          .map(() => new Cell(0, false, false, false, 0, []))
      );

    let id = 1;
    id = traverseEdge({
      grid: this.gridTop,
      startX: 5,
      startY: 0,
      id: id,
      exclude: { x: 5, y: 1 },
    });

    id = traverseEdge({
      grid: this.gridRight,
      startX: 0,
      startY: 0,
      id: id,
      exclude: { x: 1, y: 0 },
    });

    id = traverseEdge({
      grid: this.gridBottom,
      startX: 0,
      startY: 2,
      id: id,
      exclude: { x: 0, y: 1 },
    });

    id = traverseEdge({
      grid: this.gridLeft,
      startX: 2,
      startY: 5,
      id: id,
      exclude: { x: 1, y: 5 },
    });

    // assign safe cells
    // assign home cells
    // assign path cells
  }

  static GridBottom = ({
    isGotiSelectionActive,
    currentPlayerGoties,
    onGotiSelect,
    boardMap,
  }: LudoGridProps) => {
    if (LudoGrid.gridBottom.length === 0) {
      LudoGrid.createGrids();
    }

    const isGotiSelectable = (goti: GotiInterface) => {
      return currentPlayerGoties?.some((g) => g === goti) || false;
    };

    return (
      <View style={styles.vGrid}>
        <View style={styles.grid1Content}>
          {LudoGrid.gridBottom.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {cell.getId()}
                    </Text>
                    {boardMap?.get(cell.getId())?.map((goti, gotiIndex) => (
                      <Goti
                        key={gotiIndex}
                        goti={goti}
                        isSelectable={isGotiSelectable(goti)}
                        isAnimating={isGotiSelectionActive}
                        onSelect={onGotiSelect}
                        color="#00FF00" // Green for top player
                        size={16}
                      />
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

  static TopGrid = ({
    isGotiSelectionActive,
    currentPlayerGoties,
    onGotiSelect,
    boardMap,
  }: LudoGridProps) => {
    if (LudoGrid.gridTop.length === 0) {
      LudoGrid.createGrids();
    }

    const isGotiSelectable = (goti: GotiInterface) => {
      return currentPlayerGoties?.some((g) => g === goti) || false;
    };

    return (
      <View style={styles.vGrid}>
        <View style={styles.grid2Content}>
          {LudoGrid.gridTop.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {cell.getId()}
                    </Text>
                    {boardMap?.get(cell.getId())?.map((goti, gotiIndex) => (
                      <Goti
                        key={gotiIndex}
                        goti={goti}
                        isSelectable={isGotiSelectable(goti)}
                        isAnimating={isGotiSelectionActive}
                        onSelect={onGotiSelect}
                        color="#00FF00" // Green for top player
                        size={16}
                      />
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

  static Grid3 = ({
    isGotiSelectionActive,
    currentPlayerGoties,
    onGotiSelect,
    boardMap,
  }: LudoGridProps) => {
    const isGotiSelectable = (goti: GotiInterface) => {
      return currentPlayerGoties?.some((g) => g === goti) || false;
    };

    return (
      <View style={styles.hGrid}>
        <View style={styles.grid3Content}>
          {LudoGrid.gridLeft.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {cell.getId()}
                    </Text>
                    {boardMap?.get(cell.getId())?.map((goti, gotiIndex) => (
                      <Goti
                        key={gotiIndex}
                        goti={goti}
                        isSelectable={isGotiSelectable(goti)}
                        isAnimating={isGotiSelectionActive}
                        onSelect={onGotiSelect}
                        color="#00FF00" // Green for top player
                        size={16}
                      />
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

  static Grid4 = ({
    isGotiSelectionActive,
    currentPlayerGoties,
    onGotiSelect,
    boardMap,
  }: LudoGridProps) => {
    const isGotiSelectable = (goti: GotiInterface) => {
      return currentPlayerGoties?.some((g) => g === goti) || false;
    };

    return (
      <View style={styles.hGrid}>
        <View style={styles.grid4Content}>
          {LudoGrid.gridRight.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <View style={styles.cellContent}>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {cell.getId()}
                    </Text>
                    {boardMap?.get(cell.getId())?.map((goti, gotiIndex) => (
                      <Goti
                        key={gotiIndex}
                        goti={goti}
                        isSelectable={isGotiSelectable(goti)}
                        isAnimating={isGotiSelectionActive}
                        onSelect={onGotiSelect}
                        color="#00FF00" // Green for top player
                        size={16}
                      />
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
    backgroundColor: "#2a2a2a",
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
    backgroundColor: "#2a2a2a",
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
    flexDirection: "row",
  },
  cell: {
    width: cW,
    height: cW,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  cellContent: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  goti: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    margin: 1,
  },
});

export default LudoGrid;
