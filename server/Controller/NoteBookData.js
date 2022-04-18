const mongoose = require("mongoose");
const { router } = require("../app");
const { findByIdAndUpdate } = require("../Models/NotebookData");
const NotebookData = require("../Models/NotebookData");
const Official = require("../Models/Official");
const oAuthClient = require("../credentials.json");
const { google } = require("googleapis");

const CLIENT_ID = oAuthClient.web.client_id;
const AUTH_URI = oAuthClient.web.auth_uri;
const TOKEN_URI = oAuthClient.web.token_uri;
const AUTH_PROVIDER_URI = oAuthClient.web.auth_provider_x509_cert_url;
const REDIRECT_URI = oAuthClient.web.redirect_uris[0];
const CLIENT_SECRET = oAuthClient.web.client_secret;
const oAuthData = new google.auth.OAuth2(
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_URI,
  REDIRECT_URI,
  CLIENT_SECRET
);
const SCOPES = "https://www.googleapis.com/upload/drive/v3/files";
("https://www.googleapis.com/auth/userinfo.profile");

var authed = false;
const googleLogin = (req, res) => {
  if (!authed) {
    // Generate an OAuth URL and redirect there
    var url = oAuthData.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      include_granted_scopes: true,
    });
    console.log(url);
    res.redirect(url);
    // console.log(url);
    // res.render("index", { url: url });
  } else {
    var oauth2 = google.oauth2({
      auth: oAuthData,
      version: "v3",
    });
    oauth2.userinfo.get(function (err, response) {
      if (err) {
        console.log(err.message);
      } else {
        // console.log({ response });
        name = response.data.name;
        pic = response.data.picture;
        res.render("success", {
          name: response.data.name,
          pic: response.data.picture,
          success: false,
        });
      }
    });
  }
};
const NotebookDataPostcontroller = async (req, res) => {
  try {
    const { newCategory } = req.body; //get the data from body;
    if (newCategory) {
      //if user provide a new category then it will happen
      const addNewCategoryInAvaialableOne = await Official.updateOne(
        {}, //qyery
        {
          $addToSet: {
            //add a new category in the database
            availableCategory: newCategory.toLowerCase(),
          },
        }, //update
        { multi: true }
      ); //addd a new category in the databse
      if (addNewCategoryInAvaialableOne.modifiedCount != 0) {
        //if new category add succcessfully
        const noteDataDetails = new NotebookData({
          //create a new bookmark
          ...req.body,
          category: newCategory.toLowerCase(),
        });
        const isSave = await noteDataDetails.save();
        if (isSave) {
          //id save successfully
          res.status(201).json({
            message: "Save successfully and add a new cateagory",
            post: noteDataDetails,
          });
        } else {
          res.json({
            message: "Bookmark save failed",
            post: null,
          });
        }
      } else {
        res.json({
          message: "New category add failed into the official data",
          post: null,
        });
      }
    } else {
      //if existing type has been passed then it will happen
      const noteDataDetails = new NotebookData(req.body);
      const isSave = await noteDataDetails.save();
      console.log(isSave);
      if (isSave) {
        //id save successfully
        res
          .status(201)
          .json({ message: "Save successfully", post: noteDataDetails });
      } else {
        res.json({
          message: "Bookmark save failed",
          post: null,
        });
      }
    }
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};

const getNoteBookData = async (req, res) => {
  try {
    const noteDataDetails = await NotebookData.find();
    if (noteDataDetails) {
      res.status(200).json(noteDataDetails);
    }
  } catch (error) {
    console.log(error);
  }
};
const updateNoteBookData = async (req, res) => {
  try {
    const updateDataId = req.params.id;
    const {
      title,
      description,
      category
    } = req.body;
    const struct = {};
    if (title) {
      struct["title"] = title
    }
    if (description) {
      struct["description"] = description
    }
    if (category) {
      struct["category"] = category
    }
    const updateNoteBook = await NotebookData.updateOne(
      {
        _id: updateDataId,
      }, //query
      {
        $set: struct,
      }, //update
      {
        multi: true,
      } //update
    );
    // console.log(updateNoteBook);
    if (updateNoteBook.acknowledged) {
      console.log(`object`);
      res.status(202).json({
        mesasge: "Notbook has successfully updated",
      });
    } else {
      res.status(406).json({
        mesasge: "Notebook update failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(406).json({
      mesasge: err.message,
    });
  }
};
const deleteNotebookData = async (req, res) => {
  try {
    const deletedId = req.params.id;
    const deleteData = await NotebookData.deleteOne({
      //delete the notbook data
      _id: deletedId,
    });

    if (deleteData.deletedCount) {
      res.json({
        message: "successfully deleted the notebook",
        status: 202,
      });
    } else {
      res.json({
        message: "deletion failed",
        status: 406,
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
      status: 406,
    });
  }
};

//get all bookmark by category
const getAllBookmarksByCategoryController = async (req, res) => {
  try {
    const getAllCategoryAvailable = await Official.find().select("-_id"); //find all available category in the website
    if (getAllCategoryAvailable.length != 0) {
      //if category found then it will execute
      const categories = getAllCategoryAvailable[0].availableCategory;
      let allBookMarks = [];
      let storeIndex = 0; //for count the store index counting
      for (category of categories) {
        //get all bookmark data from database and give the data into a database format by category
        const findPost = await NotebookData.find({
          //find post by Category
          category,
        }).select("-__v");
        if (findPost.length != 0) {
          allBookMarks[storeIndex] = {
            category,
            bookmarksItem: findPost,
          };
          storeIndex++;
        }
      }
      if (Object.values(allBookMarks[0]).length != 0) {
        //if bookmarks found then it will happen
        res.json({
          message: "Bookmarks found",
          data: allBookMarks,
        });
      } else {
        res.json({
          message: "No bookmarks found",
          data: null,
        });
      }
    } else {
      res.json({
        message: "Category not found",
        data: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
      data: null,
    });
  }
};

//get bookmark by id
const getBookmarkById = async (req, res) => {
  try {
    const { id: bookMarkId } = req.params; //get the bookmark id from path params
    const findBookmark = await NotebookData.findOne({
      _id: bookMarkId,
    }).select("-__v");
    if (Object.values(findBookmark).length != 0) {
      res.json({
        message: "Bookmark details  found",
        bookmark: findBookmark,
      });
    } else {
      res.json({
        message: "Bookmark details not found",
        bookmark: null,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      bookmark: null,
    });
  }
};

module.exports = {
  NotebookDataPostcontroller,
  getNoteBookData,
  updateNoteBookData,
  googleLogin,
  deleteNotebookData,
  getAllBookmarksByCategoryController,
  getBookmarkById,
};
