import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatTreeNestedDataSource, MatTree } from "@angular/material/tree";
import { TreeDataSource, FoodNode } from './tree-datasource';


let TREE_DATA: FoodNode[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }]
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
        children: [{ name: "Broccoli" }, { name: "Brussel sprouts" }]
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins" }, { name: "Carrots" }]
      }
    ]
  }
];



/**
 * @title Tree with nested nodes
 */
@Component({
  selector: "tree-nested-overview-example",
  templateUrl: "tree-nested-overview-example.html",
  styleUrls: ["tree-nested-overview-example.css"]
})
export class TreeNestedOverviewExample {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new TreeDataSource(this.treeControl, TREE_DATA);

  constructor() {}

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  addGin(parentNode: FoodNode) {
    this.dataSource.add({ name: "Gin" }, parentNode);
  }

  remove(node: FoodNode) {
    this.dataSource.remove(node);
  }
}
