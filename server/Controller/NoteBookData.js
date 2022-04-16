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
    const updateNoteBook = await NotebookData.updateOne(
      {
        _id: updateDataId,
      }, //query
      {
        $set: req.body,
      }, //update
      {
        multi: true,
      } //update
    );
    // console.log(updateNoteBook);
    if (updateNoteBook.acknowledged) {
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
      res.status(202).json({
        message: "successfully deleted the notebook",
      });
    } else {
      res.status(406).json({
        message: "deletion failed",
      });
    }
  } catch (error) {
    res.status(406).json({
      message: error.message,
    });
  }
};
module.exports = {
  NotebookDataPostcontroller,
  getNoteBookData,
  updateNoteBookData,
  googleLogin,
  deleteNotebookData,
};
