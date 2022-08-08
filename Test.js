const { BehaviorTree, Sequence, Task, SUCCESS, FAILURE } = require('behaviortree');

const myTask = new Task({
    // (optional) this function is called directly before the run method
    // is called. It allows you to setup things before starting to run
    start: function (blackboard) {
      blackboard.isStarted = true
    },
  
    // (optional) this function is called directly after the run method
    // is completed with either this.success() or this.fail(). It allows you to clean up
    // things, after you run the task.
    end: function (blackboard) {
      blackboard.isStarted = false
    },
  
    // This is the meat of your task. The run method does everything you want it to do.
    run: function (blackboard) {
      console.log(blackboard.isStarted);
      return FAILURE;
    }
  })

const mySequence = new Sequence({
    nodes: [
        myTask,
        new Task({
            run: function (blackboard) {
              console.log("Hi !");
              return SUCCESS;
            }
          })
    ]
  })

var bTree = new BehaviorTree({
    tree: mySequence,
    blackboard: {}
  })

bTree.step()
