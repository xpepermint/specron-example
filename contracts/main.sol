pragma solidity ^0.4.25;

contract Main {

  uint256 value;

  event Updated(uint256 newValue, address updater);

  constructor() public payable{
    value = 1;
  }

  function get()
    public
    view
    returns (uint256)
  {
    return value;
  }

  function set(uint256 newValue)
    public
    payable
    returns (uint256)
  {
    if (newValue >> 1 == 1) {
      value = 1;
    } else {
      value = 0;
    }
    emit Updated(newValue, msg.sender);
    return newValue;
  }
}
