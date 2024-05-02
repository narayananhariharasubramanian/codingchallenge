import { render } from "@testing-library/react";

const orgData = [
  { name: "Alan", id: 100, managerId: 150 },
  { name: "Martin", id: 220, managerId: 100 },
  { name: "Jamie", id: 150 },
  { name: "Alex", id: 275, managerId: 100 },
  { name: "Steve", id: 400, managerId: 150 },
  { name: "David", id: 190, managerId: 400 },
  {name:'Narayanan', id:252, managerId:190}
];

/*
Data will be organized as in the below format
[{
managerId:150,
reportees:[100,400]},
{
managerId:100,
reportees:[220,275]
}
etc.
]

While displaying the tree is started with the node with no manager and the function is recursively called to do a depth first search and print the data like a tree. 
*/
const displayData = [];

function App() {

  function arrangeData() {
    const arrangedData=[];
    var index;
    var renderCode = '';

    //Function to print the data to the console. Recursively called.
    function printData(manager, spaces){
      var managerIndex;
      var printText = '';

      //Align the text to print like a tree
      for(let i=0; i<spaces; i++){
        printText+='        ';
      }

      var managerName=orgData[orgData.findIndex(e=>e.id===manager)].name;
      printText+=managerName;
      console.log(printText);
    
      managerIndex = arrangedData.findIndex(element=>element.managerId===manager)
      if(managerIndex!=-1) {
        arrangedData[managerIndex].reportees.map(data=>{printData(data, spaces+1)});
      }
    }


    orgData.map((emp)=>{
      index=arrangedData.findIndex(element=>element.managerId===emp.managerId)
      if(index===-1){
        arrangedData.push({managerId:emp.managerId, reportees:[emp.id]})
      }else{
        arrangedData[index].reportees.push(emp.id)
      }
    });

    index = arrangedData.findIndex(element=>!element.managerId)
    printData(arrangedData[index].reportees[0],0);
    console.log(renderCode)
    return renderCode;
  }


  return (
    <div className="App">
      <span>ProgressBar</span>
      <p>{arrangeData()}</p>
    </div>
  );
}

export default App;
