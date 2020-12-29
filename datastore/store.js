/* eslint-disable promise/param-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-lonely-if */
/* eslint-disable no-empty */
/* eslint-disable no-async-promise-executor */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const path = require('path');
const Datastore = require('nedb');
// eslint-disable-next-line prettier/prettier
  let db = new Datastore({ filename: path.join(__dirname, '/MdDatabase.db') });

db.loadDatabase(function (err) {
  // Callback is optional
  // Now commands will be executed
  console.log('databaseloaded');
});
db = {};
db.users = new Datastore('users.db');
db.tablets = new Datastore('tablets.db');
db.syrups = new Datastore('syrups.db');
db.tubes = new Datastore('tubes.db');

// You need to load each database (here we do it asynchronously)
db.users.loadDatabase();
db.tablets.loadDatabase();
db.syrups.loadDatabase();
db.tubes.loadDatabase();

function SearchTabletById(id) {
  return new Promise((resolve, reject) => {
    db.tablets.find({_id:id}, function (err, result) {
      if (err) reject(null);
      resolve(result[0]);
    });
  });
}
function SearchSyrupById(id) {
  return new Promise((resolve, reject) => {
    db.syrups.find({_id:id}, function (err, result) {
      if (err) reject(null);
      resolve(result[0]);
    });
  });
}
function SearchTubeById(id) {
  return new Promise((resolve, reject) => {
    db.tubes.find({_id:id}, function (err, result) {
      if (err) reject(null);
      resolve(result[0]);
    });
  });
}
function InsertTabletRecord(document) {
  return new Promise(async(resolve, reject) => {
    const row=await SearchTabletById(document.id);
    if(row!=null && document.id){
      db.tablets.update({_id:document.id},
      {
      $set:
      {
      TabletName:document.TabletName,
      GenericName:document.GenericName,
      Pathophysiology:document.Pathophysiology,
      TotalPieces:document.TotalPieces,
      PurchasePrice:document.PurchasePrice,
      SellingPrice:document.SellingPrice
      }
      },{},async(err,numDocs)=>{
        if (err){
           reject(null);
        } else {
          if(numDocs>=1){
          const updatedRow=await SearchTabletById(row._id);
          resolve(updatedRow);
          }
        }});
    }else{
      db.tablets.insert(document, function (error, response) {
        if (error) {
          reject(null);
        } else {
          resolve(response);
        }
      });
    }
  });
}
function InsertSyrupRecord(document) {
  return new Promise(async(resolve, reject) => {
    const row=await SearchSyrupById(document.id);
    if(row!=null && document.id){
      db.syrups.update({_id:document.id},
      {
      $set:
      {
      SyrupName:document.SyrupName,
      GenericName:document.GenericName,
      Pathophysiology:document.Pathophysiology,
      TotalPieces:document.TotalPieces,
      PurchasePrice:document.PurchasePrice,
      SellingPrice:document.SellingPrice
      }
      },{},async(err,numDocs)=>{
        if (err){
           reject(null);
        } else {
          if(numDocs>=1){
          const updatedRow=await SearchSyrupById(row._id);
          resolve(updatedRow);
          }
        }});
    }else{
      db.syrups.insert(document, function (error, response) {
        if (error) {
          reject(null);
        } else {
          resolve(response);
        }
      });
    }
  });
}
function InsertTubeRecord(document) {
  return new Promise(async(resolve, reject) => {
    const row=await SearchTubeById(document.id);
    if(row!=null && document.id){
      db.tubes.update({_id:document.id},
      {
      $set:
      {
      TubeName:document.TubeName,
      GenericName:document.GenericName,
      Pathophysiology:document.Pathophysiology,
      TotalPieces:document.TotalPieces,
      PurchasePrice:document.PurchasePrice,
      SellingPrice:document.SellingPrice
      }
      },{},async(err,numDocs)=>{
        if (err){
           reject(null);
        } else {
          if(numDocs>=1){
          const updatedRow=await SearchTubeById(row._id);
          resolve(updatedRow);
          }
        }});
    }else{
      db.tubes.insert(document, function (error, response) {
        if (error) {
          reject(null);
        } else {
          resolve(response);
        }
      });
    }
  });
}
function DeleteTablet(id) {
  return new Promise((resolve, reject) => {
    db.tablets.remove({ _id: id }, {}, function (err, numRemoved) {
      console.log(`in dlete${numRemoved}`);
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
}
function DeleteSyrup(id) {
  return new Promise((resolve, reject) => {
    db.syrups.remove({ _id: id }, {}, function (err, numRemoved) {
      console.log(`in dlete${numRemoved}`);
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
}
function DeleteTube(id) {
  return new Promise((resolve, reject) => {
    db.tubes.remove({ _id: id }, {}, function (err, numRemoved) {
      console.log(`in dlete${numRemoved}`);
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
}
function SearchTablets() {
  return new Promise((resolve, reject) => {
    db.tablets.find({}, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function SearchSyrups() {
  return new Promise((resolve, reject) => {
    db.syrups.find({}, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function SearchTubes() {
  return new Promise((resolve, reject) => {
    db.tubes.find({}, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}
function updateTabletQty(row) {
  return new Promise((reject,resolve)=>{
    db.tablets.update({_id:row.id},
      {
      $set:
      {
      TotalPieces:row.availableqty-row.qty,
      }
      },{},function (err,numDocs){
        if (err){
           reject(null);
        } else {
          resolve(numDocs);
        }});
  });

}
function updateSyrupQty(row) {
  return new Promise((reject,resolve)=>{
    db.syrups.update({_id:row.id},
      {
      $set:
      {
      TotalPieces:row.availableqty-row.qty,
      }
      },{},function (err,numDocs){
        if (err){
           reject(null);
        } else {
          resolve(numDocs);

        }});
  });
}
function updateTubeQty(row) {
  return new Promise((reject,resolve)=>{
    db.tubes.update({_id:row.id},
      {
      $set:
      {
      TotalPieces:row.availableqty-row.qty,
      }
      },{},function (err,numDocs){
        if (err){
           reject(null);
        } else {
          resolve(numDocs);

        }});
  });
}
function SearchTabletByValue(value) {
  return new Promise((resolve, reject) => {
    db.tablets.find({TabletName:value}, function (err, result) {
      if (err) reject(null);
      resolve(result[0]);
    });
  });
}
function SearchTubeByValue(value) {
  return new Promise((resolve, reject) => {
    db.tubes.find({TubeName:value}, function (err, result) {
      if (err) reject(null);
      resolve(result[0]);
    });
  });
}
function SearchSyrupByValue(value) {
  return new Promise((resolve, reject) => {
    db.syrups.find({SyrupName:value}, function (err, result) {
      if (err) reject(null);
      resolve(result[0]);
    });
  });
}
export {
  InsertTabletRecord,
  InsertSyrupRecord,
  InsertTubeRecord,
  SearchTablets,
  SearchSyrups,
  SearchTubes,
  DeleteTablet,
  DeleteSyrup,
  DeleteTube,
  updateTabletQty,
  updateSyrupQty,
  updateTubeQty,
  SearchTabletByValue,
  SearchTubeByValue,
  SearchSyrupByValue
};
