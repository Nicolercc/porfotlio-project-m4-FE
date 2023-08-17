import Axios from "./Axios";
import { useParams } from "react-router-dom";

const { input } = useParams;

//get all
async function getAllQuotes() {
  try {
    let result = await Axios.get("/quotes");
  } catch (e) {
    alert(e.response.data.error);
    return e;
  }
}

//get all by category
async function getAllQuotesByCategory() {
  try {
    let result = await Axios.get("/quotes/category");
    return result;
  } catch (e) {
    alert(e.response.data.error);
    return e;
  }
}

//get by id
async function getQuoteById(id) {
  try {
    let result = await Axios.get(`/quotes/${id}`);
    return result;
  } catch (e) {
    alert(e.response.data.error);
    return e;
  }
}

//delete by id
async function deleteQuoteById(id) {
  try {
    let result = await Axios.delete(`/Quotes/${id}`);

    return result;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

//update by id
async function updateQuoteById(id, updatedQuote) {
  try {
    let result = await Axios.put(`/quotes/${id}`, updatedQuote);

    return result;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

//create quote
async function createQuote(quote) {
  try {
    let result = await Axios.post(`/quotes`, quote);
    return result;
  } catch (e) {
    alert(e.response.data.error);
    return e;
  }
}

//get all
async function getAllCategories() {
  try {
    let result = await Axios.get("/quotes/categories");

    return result;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

//get by id
async function getQuoteByCategoryId(id) {
  try {
    let result = await Axios.get(`/quotes/categories/${id}`);

    return result;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

export {
  getAllQuotes,
  getAllQuotesByCategory,
  getQuoteById,
  deleteQuoteById,
  updateQuoteById,
  createQuote,
  getAllCategories,
  getQuoteByCategoryId,
};
