import {
  ADD_USER,
  FETCH_USER,
  EDIT_BILL,
  DELETE_BILL,
  ADD_PAYMENT,
  UPDATE_BILL,
  USER_GOALS,
  DELETE_GOAL,
  EDIT_GOAL,
  UPDATE_GOAL
} from "../constants";

const initialState = {
  users: [],
  activeUserId: "",
  activeUser: null,
  updateBill: {},
  updateGoal: {}
};

//Helper function to update billTitle and billCost for ADD_USER action.type
const updateUserBills = (state, id, title, cost) => {
  let copy = [...state.users];
  let index = copy.findIndex(x => x.id === id);
  if (index !== -1) {
    copy[index].billTitle.push(
      title[0].toUpperCase() + title.slice(1).toLowerCase()
    );
    copy[index].billCost.push(+cost.toFixed(2));
  }
  return copy;
};

const updateUserGoals = (state, id, title, cost) => {
  let userGoalCopy = [...state.users];
  let index = state.users.findIndex(x => x.id === id);
  if (index !== -1) {
    userGoalCopy[index].goalTitle.push(
      title[0].toUpperCase() + title.slice(1).toLowerCase()
    );
    userGoalCopy[index].goalCost.push(+cost.toFixed(2));
  }
  return userGoalCopy;
};

const savingCalculator = (state, id, cost, income) => {
  let userSavingsCopy = [...state.users];
  let index = state.users.findIndex(x => x.id === id);
  let totalMonthlyExpenses = cost.reduce((a, b) => a + b);
  let monthlySavings = income - totalMonthlyExpenses;
  userSavingsCopy[index].savings = monthlySavings;
  return userSavingsCopy;
};

const rootReducer = (state = initialState, action) => {
  let index;
  switch (action.type) {
    case ADD_USER:
      return {
        ...state, //Copy State
        users: [...state.users, action.newUser], //Update copied state
        activeUserId: action.newUser.id,
        activeUser: action.newUser
      };

    //To update billTitle and/or billCost
    case ADD_PAYMENT:
      return {
        ...state,
        users: updateUserBills(state, action.id, action.title, action.cost)
      };

    case FETCH_USER:
      index = state.users.findIndex(x => x.id === action.UserId);
      return {
        ...state,
        activeUser: state.users[index]
      };

    case DELETE_BILL:
      /*let usersCopy = [...state.users]; this is a shallow copy of the state.
      Because the copy I needed was an array inside another array, I needed a deep copy of state.users.
      JSON.stringify creates a deep copy and allows the delete button to re-render the page on './billreview*/
      let usersCopy = JSON.parse(JSON.stringify(state.users)); //Deep Copy
      index = state.users.findIndex(x => x.id === action.UserId);
      usersCopy[index].billTitle.splice(action.billTitleIndex, 1);
      usersCopy[index].billCost.splice(action.billTitleIndex, 1);
      return {
        ...state,
        users: usersCopy,
        activeUser: usersCopy[index]
      };

    case EDIT_BILL:
      let billTitle = action.title;
      let billCost = action.cost;
      index = action.index;
      return {
        ...state,
        updateBill: { billTitle, billCost, index }
      };

    case UPDATE_BILL:
      let updateBillCopy = [...state.users];
      index = state.users.findIndex(x => x.id === action.UserId);
      updateBillCopy[index].billTitle.splice(action.bill.index, 1, action.bill.billTitle[0].toUpperCase() + action.bill.billTitle.slice(1).toLowerCase());
      updateBillCopy[index].billCost.splice(action.bill.index, 1, +action.bill.billCost.toFixed(2));
      return {
        ...state,
        users: updateBillCopy
      };

    case USER_GOALS:
      return {
        ...state,
        users: updateUserGoals(state, action.id, action.title, action.cost)
      };

    case DELETE_GOAL:
      /*let usersCopy = [...state.users]; this is a shallow copy of the state.
        Because the copy I needed was an array inside another array, I needed a deep copy of state.users.
        JSON.stringify creates a deep copy and allows the delete button to re-render the page on './billreview*/
      let usersDeleteGoalCopy = JSON.parse(JSON.stringify(state.users)); //Deep Copy
      index = state.users.findIndex(x => x.id === action.UserId);
      usersDeleteGoalCopy[index].goalTitle.splice(action.goalTitleIndex, 1);
      usersDeleteGoalCopy[index].goalCost.splice(action.goalTitleIndex, 1);
      return {
        ...state,
        users: usersDeleteGoalCopy,
        activeUser: usersDeleteGoalCopy[index]
      };

      case EDIT_GOAL:
        let goalTitle = action.title;
        let goalCost = action.cost;
        index = action.index;
        return {
          ...state,
          updateGoal: { goalTitle, goalCost, index }
        };

      case UPDATE_GOAL:
        let updateGoalCopy = [...state.users];
        index = state.users.findIndex(x => x.id === action.UserId);
        updateGoalCopy[index].goalTitle.splice(action.goal.index, 1, action.goal.goalTitle[0].toUpperCase() + action.goal.goalTitle.slice(1).toLowerCase());
        updateGoalCopy[index].goalCost.splice(action.goal.index,1,+action.goal.goalCost.toFixed(2));
        return {
          ...state,
          users: updateGoalCopy
        };

    default:
      return state;
  }
};

export default rootReducer;
