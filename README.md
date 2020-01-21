# Updatable Angular Material Tree

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-material-nested-tree-with-updates)

The cdk tree only renders updates of the backing datastore when the IterableDiffer sees a difference, https://github.com/angular/components/blob/master/src/cdk/tree/tree.ts#L215.

Therefore cdk tree updates are not triggered when objects references stays the same. In order to solve that properly, all objects from the root to the relevant updated node must be updated, aka an immutable update https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/

Here's an example of removing / adding nodes to a nested data source. It replaces relevant nodes on the path from the root to the changed node. And it keeps the expansion state.

https://angular-material-nested-tree-with-updates.stackblitz.io/

In addition, the example features a border bottom on each node in the full width of the tree. The CSS for this can be tricky to come up with. However, it's just a matter of applying relative and absolute positioning.
