// Sorting and removing duplicates from the array
Array.prototype.sortBubble=function(){
    for(var i=0, tmp;i<this.length-1;i++){

        for(var j=0;j<this.length-1;j++){

            if(this[j]>this[j+1]){
                tmp=this[j];
                this[j]=this[j+1];
                this[j+1]=tmp;
            }
            if(this[j] === this[j+1]){
                this.splice(j,1)
            }
        }   
    }
    return this;
}
    


class Node{
    constructor(value = null){
        this.value = value;
        this.left = null;
        this.right = null;
    }
   
}

class Tree{
    constructor(){
        
        this.root = null
    }
    // Check if the array is sorted
    checkSort(arr){
        for(let i =1 ; i < arr.length;i++){
            for(let j = i-1; j<i ;j++){
                // console.log(arr[j])
                // console.log(arr[i])
                // console.log('---------------')
                if(arr[j]>arr[i]){
                    return false
                }
            }
        }
        return true
    }
    // function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
    // and turns it into a balanced binary tree full of Node objects appropriately placed 
    buildTree = (arr ,start = 0, end = arr.sortBubble().length -1) =>{
        

        
        if(start>end) return null

        // Check if the array is sorted
        if(!this.checkSort(arr)){
            console.log("here")
            arr = arr.sortBubble();
            console.log(arr)
        }
        
        // The middle of the array
        let mid = Math.floor( ((start+end)/2) ) ;

        // We create a new node with the center value of the sorted array
        let node = new Node(arr[mid]);
        // this.root = node;

        // repeat this with the left subarray
        node.left = this.buildTree(arr,start,mid-1)

        // repeat this with the left subarray
        node.right = this.buildTree(arr, mid+1, end);
        
        this.root = node;
        return this.root
    }

    prettyPrint = (node=this.root, prefix = '', isLeft = true) => {

        if (node.right !== null) {
       
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
      
      
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
      
        if (node.left !== null) {
      
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
      
    //insert the element into the tree
    insert = (item) =>{
       
        if(this.root === null) return null

        let a = new Node(item)                
        let current = this.root

        while(current){

            // Checks if an element is smaller than the current node
            if(item<current.value){
              
                if(current.left === null){
                    // insert an element
                    current.left = a;
                    return current
                }

                current = current.left
            }
            // Checks if an element is greater than the current node
            else if(current.value<item){
                      
                if(current.right === null){
                    // insert an element
                    current.right = a;
                    return current
                }

                current = current.right
            }
        }
    }

    // remove the element from the tree
    delete = (item, current = this.root) =>{

        console.log(current)
        if(current === null) return null;
        

        //  looking for a given item
        // If it is smaller than the current node, we search in the left subtree
        if(item < current.value){
            current.left = this.delete(item,current.left)

        }
        // If it is larger than the current node, we search in the right subtree
        else if(item > current.value) {
            current.right = this.delete(item,current.right)

        }else{
            
            // We check whether the element has at least one child
            if (current.left == null) return current.right;
            else if (current.right == null)return current.left;
            
            else{
                // search for the next minimum value in the right subtree of the current node to replace the current node
               current.value = this.minValue(current.right);
              
                // Recursively call the function
               current.right = this.delete(current.value,current.right)
               
            }
        }
      
        return current
    }

   minValue = (node) => {

        let min = node.value;
        while (node.left != null)
        {
            min = node.left.value;
            node = node.left;
        }
        return min;
    }

    //  looking for a given item
    find =(item,current = this.root)=>{
        
        if(current === null) return null;
        
        if(item < current.value){
            current = this. find(item,current.left)
      
        }
        else if(item > current.value) {
            current = this. find(item,current.right)
   
        }  
       
        return current
    }

    levelOrder = (func,)=>{

        let queue = [this.root];
        let list = [];

        while(queue.length != 0){
            let current = queue.shift();
            let nextQueue
          
            func?func(current.value) :list.push(current);

            
            if(current.left === null && current.right === null){
                nextQueue = []
            }     
            else if(current.left === null) nextQueue = [current.right]
            else if(current.right === null) nextQueue = [current.left]
            else{
                nextQueue = [
                    current.left,
                    current.right
                ]
            }
            

            queue.push(...nextQueue)
           

        }

        if(list.length > 0) return list

    }

    preOrder = (func,current = this.root) =>{

        if(func){
            if(current === null) return null;
            func(current.value)
            this.preOrder(func,current.left)
            this.preOrder(func,current.right)
        }
        else{
            if(current === null) return [];

            let a = [current.value,...this.preOrder(func,current.left),...this.preOrder(func,current.right)]
            return [...a]
        }
    }   

    inOrder = (func,current = this.root) =>{

        if(func){
            if(current === null) return null;
            this.inOrder(func,current.left)
        
            func(current.value)
            
            this.inOrder(func,current.right)
        }
        else{
            if(current === null) return [];

            let a = [...this.inOrder(func,current.left),current.value,...this.inOrder(func,current.right) ]
            return [...a]
        }
    }   

    postOrder = (func,current = this.root) =>{

        if(func){
            if(current === null) return null;
            this.postOrder(func,current.left)
            this.postOrder(func,current.right)
            func(current.value)
        }
        else{
            if(current === null) return [];

            let a = [...this.postOrder(func,current.left),...this.postOrder(func,current.right),current.value ]
            return [...a]
        }
    }  
    
    depth = (item) =>{
        
        if(this.root === null) return null;
        
        let length=0;
        let current = this.root
        while(current!= null)
        {
            if(item > current.value){
                length+=1
                current = current.left
            }
            else if (item < current.value){
                length+=1
                current= current.right
            }
        }
        

        return length-1
    }

    isBalanced = (current = this.root) =>{
        if(current === null){
            return true
        }

        let lh = this.height(current.left)
        let rh = this.height(current.right)

        if(Math.abs(lh-rh) <= 1 && this.isBalanced(current.left) && this.isBalanced(current.right)){
            return true
        }

        return false
    }

    height = (current = this.root) =>{
        if(current===null) return 0;
        return Math.max(this.height(current.left),this.height(current.right))+1 ;
        
    }

    rebalance = () =>{
        let arr = [];
        arr = this.inOrder()
        console.log(arr)
        this.buildTree(arr)
    }

    
}


let tr = new Tree();

tr.buildTree([1, 18, 4, 423, 2, 0, 2, 4, 3, 7, 6, 54, 6]);

console.log(tr.isBalanced())//true

console.log(tr.preOrder())//[4, 1, 0, 2, 3, 18, 6, 7, 54, 423]
console.log(tr.inOrder())//[0, 1, 2, 3, 4, 6, 7, 18, 54, 423]
console.log(tr.postOrder())//[0, 3, 2, 1, 7, 6, 423, 54, 18, 4]

tr.prettyPrint()
//  │           ┌── 423
//  │       ┌── 54
//  │   ┌── 18
//  │   │   │   ┌── 7
//  │   │   └── 6
//  └── 4
//      │       ┌── 3
//      │   ┌── 2
//      └── 1
//          └── 0

tr.insert(100)
tr.insert(102)
tr.insert(330)

console.log(tr.isBalanced())//false

tr.rebalance()

console.log(tr.isBalanced())//true

console.log(tr.preOrder())//[7, 2, 0, 1, 4, 3, 6, 100, 18, 54, 330, 102, 423]
console.log(tr.inOrder())//[0, 1, 2, 3, 4, 6, 7, 18, 54, 100, 102, 330, 423]
console.log(tr.postOrder())//[1, 0, 3, 6, 4, 2, 54, 18, 102, 423, 330, 100, 7]





