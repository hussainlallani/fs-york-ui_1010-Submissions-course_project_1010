// None of these need to be npm installed as they come with Node.js.
import util from 'util'
import fs from 'fs'
import path from 'path'

/**
 * Allows us to use promises instead of callbacks for reading and writing files.
 * @see https://gist.github.com/mpalmr/0425308566af4e1b42b860702c40989c
 */
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// Defines the path for the database file `items.json`.
// const dbPath = path.resolve('data/users.json')

let filePath = ""

const dbPath = async (fileName,newItem) => {
    filePath = path.resolve(`data/${fileName}.json`)
    
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
          console.log("File does not exist.")
          const dirPath=path.resolve("data")

          if (!fs.existsSync(dirPath)) {
            console.log(`Directory exists: ${dirPath}`)
            
            fs.mkdir(dirPath, function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
          }

          const jsonData = JSON.stringify({...newItem})
          
          // const mkFile = async (dirPath) => {
            fs.appendFile(`data/${fileName}.json`,`[${jsonData}]`,(err)=>{
              if (err){
                  console.log(`Failed to create file: ${fileName}`)
              } else {
                  console.log(`File successfully created: ${fileName}`)
                  console.log(newItem)
                  filePath = path.resolve(`data/${fileName}.json`)
              }
            })
          // }  
        } else {
          console.log("File exists.")
          filePath = path.resolve(`data/${fileName}.json`)
        }
    })
    return filePath
}

/**
 * Reads all the contents out of the `items.json` file and returns the *parsed* JSON.
 * @returns {Array<object>} DB contents parsed from JSON
 */
async function readItems(fileName,newItem) {
  console.log("readItems")
  const jsonPath = await dbPath(fileName,newItem)
  const json = await readFile(jsonPath)
  return JSON.parse(json)
}

/**
 * Replaces the contents of the `items.json` file with JSON derrived from the `items` param.
 * @param {Array<object>} items to be parsed into JSON to be made the file contents.
 * @returns {Promise<undefined>} resolves when file contents are written
 */
async function writeItems(fileName,items) {
  // The `null` and `2` here are so the JSON is formatted in a readable format, it's not required.
  const json = JSON.stringify(items, null, 2)

  // We return the promise here so the promise returned by `writeItems` doesn't resolve until
  // all the items are actually written.
  const jsonPath = await dbPath(fileName,items)
//   return writeFile(dbPath, json)
    return writeFile(jsonPath, json)
}


/**
 * Gets an item by ID. If the item doesn't exist, return `null`.
 * @param {number} id to get item by.
 * @returns {Promise<object|null>} matching item
 */
async function getItemById(id) {
  const items = await readItems() // Read all items out of DB

  // Find item matching the ID passed into this function
  let matchedItem
  items.forEach((item) => {
    if (item.id === id) {
      matchedItem = item
    }
  })

  // Return `matchedItem` if exists, else `null`
  if (matchedItem) {
    return matchedItem
  }
  return null
}


/**
 * Creates a new item.
 * @param {object} newItem new item to add to DB
 * @returns {Promise<undefined>} resolves when item is created in DB
 */
async function createItem(fileName,newItem) {
  const items = await readItems(fileName,newItem) // Read all items out of DB
  items.push(newItem) // Add new item to items

  // We return the promise here so the promise returned by `createItem` doesn't resolve until
  // all the items are actually written.
  return writeItems(fileName,items)
}


/**
 * Updates items with a matching ID.
 * @param {object} updatedItem item to replace any item with a matching ID
 * @returns {Promise<undefined>}
 */
async function updateItem(fileName,updatedItem) {
  const items = await readItems() // Read all items out of DB

  // If an item's ID matches the updatedItem's ID replace that item with the `updatedItem`
  items.forEach((item, i) => {
    if (item.id === updatedItem.id) {
      items[i] = updatedItem
    }
  })

  // We return the promise here so the promise returned by `createItem` doesn't resolve until
  // all the items are actually written.
  return writeItems(fileName,items)
}


/**
 * Removes an item by ID.
 * @param {number} id to remove
 * @returns {Promise<undefined>} resolves when item is removed from DB
 */
async function removeItem(fileName,id) {
  const items = await readItems() // Read all items out of DB

  // If an item's ID matches the `id` parameter
  // do not push that item into the array of remaining items
  let remainingItems
  items.forEach((item) => {
    if (item.id !== id) {
      remainingItems.push(item)
    }
  })

  // We return the promise here so the promise returned by `createItem` doesn't resolve until
  // all the items are actually written.
  return writeItems(fileName,remainingItems)
}


// Now we export everything we want to expose to anything requiring this file as a module.
export {
  getItemById,
  createItem,
  updateItem,
  removeItem,
  // Here we give the readItems function a different name that makes sense for files requiring it
  readItems as getAllItems,
}
