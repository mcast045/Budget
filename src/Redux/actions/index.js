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
import uniqid from "uniqid";

export const addUser = user => ({
  type: ADD_USER,
  newUser: { id: uniqid(), ...user }
});

export const addPayment = (id, title, cost) => ({
  type: ADD_PAYMENT,
  id,
  title,
  cost
});

export const fetchUser = id => ({
  type: FETCH_USER,
  UserId: id
});

export const editBill = (title, cost, index) => ({
  type: EDIT_BILL,
  title,
  cost,
  index
});

export const updateBill = (bill, id) => ({
  type: UPDATE_BILL,
  bill,
  UserId: id
});

export const deleteBill = (id, billTitleIndex) => ({
  type: DELETE_BILL,
  UserId: id,
  billTitleIndex
});

export const addGoals = (title, cost, id) => ({
  type: USER_GOALS,
  title,
  cost,
  id
});

export const deleteGoal = (id, goalTitleIndex) => ({
  type: DELETE_GOAL,
  UserId: id,
  goalTitleIndex
});


export const editGoal = (title, cost, index) => ({
  type: EDIT_GOAL,
  title,
  cost,
  index
});


export const updateGoal = (goal, id) => ({
  type: UPDATE_GOAL,
  goal,
  UserId: id
});