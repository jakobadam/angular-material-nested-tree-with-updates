import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatTreeNestedDataSource, MatTree } from "@angular/material/tree";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface FoodNode {
  name: string;
  children?: FoodNode[];
}

export class TreeDataSource extends MatTreeNestedDataSource<FoodNode> {
  constructor(
    private treeControl: NestedTreeControl<FoodNode>,
    intialData: FoodNode[]
  ) {
    super();
    this._data.next(intialData);
  }

  /** Add node as child of parent */
  public add(node: FoodNode, parent: FoodNode) {
    // add dummy root so we only have to deal with `FoodNode`s
    const newTreeData = { name: "Dummy Root", children: this.data };
    this._add(node, parent, newTreeData);
    this.data = newTreeData.children;
  }

  /** Remove node from tree */
  public remove(node: FoodNode) {
    const newTreeData = { name: "Dummy Root", children: this.data };
    this._remove(node, newTreeData);
    this.data = newTreeData.children;
  }

  /*
   * For immutable update patterns, have a look at:
   * https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
   */

  protected _add(newNode: FoodNode, parent: FoodNode, tree: FoodNode) {
    if (tree === parent) {
      console.log(
        `replacing children array of '${parent.name}', adding ${newNode.name}`
      );
      tree.children = [...tree.children!, newNode];
      this.treeControl.expand(tree);
      return true;
    }
    if (!tree.children) {
      console.log(`reached leaf node '${tree.name}', backing out`);
      return false;
    }
    return this.update(tree, this._add.bind(this, newNode, parent));
  }

  _remove(node: FoodNode, tree: FoodNode): boolean {
    if (!tree.children) {
      return false;
    }
    const i = tree.children.indexOf(node);
    if (i > -1) {
      tree.children = [
        ...tree.children.slice(0, i),
        ...tree.children.slice(i + 1)
      ];
      this.treeControl.collapse(node);
      console.log(`found ${node.name}, removing it from`, tree);
      return true;
    }
    return this.update(tree, this._remove.bind(this, node));
  }

  protected update(tree: FoodNode, predicate: (n: FoodNode) => boolean) {
    let updatedTree: FoodNode, updatedIndex: number;

    tree.children!.find((node, i) => {
      if (predicate(node)) {
        console.log(`creating new node for '${node.name}'`);
        updatedTree = { ...node };
        updatedIndex = i;
        this.moveExpansionState(node, updatedTree);
        return true;
      }
      return false;
    });

    if (updatedTree!) {
      console.log(`replacing node '${tree.children![updatedIndex!].name}'`);
      tree.children![updatedIndex!] = updatedTree!;
      return true;
    }
    return false;
  }

  moveExpansionState(from: FoodNode, to: FoodNode) {
    if (this.treeControl.isExpanded(from)) {
      console.log(`'${from.name}' was expanded, setting expanded on new node`);
      this.treeControl.collapse(from);
      this.treeControl.expand(to);
    }
  }
}