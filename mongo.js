const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://fs19osa3:${password}@cluster0-bwk7l.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true }).then(
    console.log('connecting to MongoDB')
  ).catch( err => {
    console.log(err.message)
  })

  console.log('phonebook:')
  Person
    .find({}).then(result => {
      result.forEach(person => {
        console.log(person.name + ' ' + person.number)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const password = process.argv[2]
  const url = `mongodb+srv://fs19osa3:${password}@cluster0-bwk7l.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true }).then(
    console.log('connecting to MongoDB')
  ).catch( err => {
    console.log(err.message)
  })

  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })
  person
    .save().then(response => {
      console.log('added ' + response.name + ' number ' + response.number + ' to phonebook')
      mongoose.connection.close()
    })
} else {
  console.log('invalid data input')
  mongoose.connection.close()
}