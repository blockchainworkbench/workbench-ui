import React from 'react';
import TitleHeader from "./layout/TitleHeader";
import ExerciseElement from "./page/elements/ExerciseElement";

const exercise1 = {
    initial: "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n  uint public bite = 0;\n\n  function eat(bytes32 _password) public {\n    // Super Super Simple\n    require(_password == \"Super Super Muffin\");\n    // Super Super Tasty\n    bite = bite + 1;\n  }\n}",
    solution: "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n  uint public bite = 0;\n\n  function eat(bytes32 _password) public {\n    // Super Super Simple\n    require(_password == \"Super Super Muffin\");\n    // Super Super Tasty\n    bite = bite + 1;\n  }\n}",
    validation: "[{\"abi\":[{\"constant\":false,\"inputs\":[{\"name\":\"_addresses\",\"type\":\"address[]\"}],\"name\":\"testEatTrue\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addresses\",\"type\":\"address[]\"}],\"name\":\"testEatFalse\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"result\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"message\",\"type\":\"string\"}],\"name\":\"TestEvent\",\"type\":\"event\"}],\"address\":\"0x0778953B7663cA3eb85b00eEc96f16421B609F1F\"}]"
};

const exercise2 = {
    //initial: "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n    uint public bite = 0;\n\n    // Write securityCheck modifier\n\n    // You will have to update this function according to the code above\n    function eat(bytes32 _password) public {\n        require();\n        bite = bite + 1;\n    }\n\n    // You should implement touch here\n}",
    initial: "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n    uint public bite = 0;\n\n    // Exactly the same one I&apos;ve given you before\n    modifier securityCheck(bytes32 _password) {\n        require(_password == \"Super Super Muffin\");\n        _;\n    }\n\n    function eat(bytes32 _password) public securityCheck(_password) {\n        bite = bite + 1;\n    }\n\n    // Very similar to `eat`\n    function touch(bytes32 _password) pure public securityCheck(_password) returns (bool) {\n        return true;\n    }\n}",
    solution: "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n    uint public bite = 0;\n\n    // Exactly the same one I&apos;ve given you before\n    modifier securityCheck(bytes32 _password) {\n        require(_password == &quot;Super Super Muffin&quot;);\n        _;\n    }\n\n    function eat(bytes32 _password) public securityCheck(_password) {\n        bite = bite + 1;\n    }\n\n    // Very similar to `eat`\n    function touch(bytes32 _password) pure public securityCheck(_password) returns (bool) {\n        return true;\n    }\n}",
    validation: "[{\"abi\":[{\"constant\":false,\"inputs\":[{\"name\":\"_addresses\",\"type\":\"address[]\"}],\"name\":\"testTouchFalse\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addresses\",\"type\":\"address[]\"}],\"name\":\"testTouchTrue\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"result\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"message\",\"type\":\"string\"}],\"name\":\"TestEvent\",\"type\":\"event\"}],\"address\": \"0x9eB075aD45B4A0A9D7841b06F35f20a26a22057A\"}]"
};

class Web3Playground extends React.Component {


    render() {
        return (<section className="hero">
            <TitleHeader/>
            <div className="hero-body">
                <div className="container">
                    <ExerciseElement content={exercise2} id='demoExercise12398'/>
                </div>
            </div>
        </section>)
    }
}

export default Web3Playground;

