---
title: Unit Testing dengan Mocha, Sinon, Chai di Nodejs
date: "2019-11-10"
---

Artikel ini dibuat untuk review sekaligus dokumentasi ketika exploring mengenai unit testing. Isinya seharusnya *newbie friendly* karena memang dibuat untuk belajar. Unit testingnya menggunakan node js. 
<!-- end --->

Aku mendengar istilah unit testing sekitar tahun 2017, ketika masih magang di sebuah startup. Waktu itu mendapatkan task untuk menulis unit testing pada code mereka. *Time skip* ke waktu kerja, kembali lagi disuruh exploring mengenai unit testing, dan jadilah tulisan ini.

Subjek dari tulisan bakal menggunakan kami/kita karena memang ditujukan untuk tim dev lain. Karena malas aku ubah jadi langsung kopas saja haha. Btw semoga bermanfaat.

# Installasi
Kami menggunakan [Mocha](https://mochajs.org/) sebagai test framework, [Chai](https://www.chaijs.com/) untuk assertion, dan [Sinon.js](https://sinonjs.org/) untuk membuat Doubles. Berikut code untuk instalasi.
```bash
$ npm install sinon mocha chai --save-dev 
```
```--save-dev``` digunakan karena modul-modul ini hanya dibutuhkan ketika melakukan development. Kita tidak membutuhkan modul ini ketika production.

# Membuat script
Hal yang utama dilakukan untuk membuat script adalah menentukan fungsi yang ingin di test, beserta apa saja yang akan ditest dalam fungsi itu.

Misal kita ingin melakukan unit test pada function berikut:

```javascript
/*number-lib.js*/

function addInteger(x, y) {
    if (Number.isInteger(x) && Number.isInteger(y)) {
        return x + y   
    }
    else {
        return 'Number is not integer'
    }
    return 
}
module.exports = {
    addInteger
}
```

Fungsi diatas merupakan fungsi untuk menjumlahkan integer x dan y, apabila bukan integer maka mereturn sebuah string bahwa bilangan bukan integer. Pertama kita akan menentukan scope test kita sebagai berikut:

```javascript
// number-list-test.spec.js
const numberLib = require('./number-lib.js')

describe('Add integer', () => {
    it('should return 23', () => {
       // Arrange
       ...
       // Act
       ...
       // Assert
       ...
    })
    it('should return "Number is not integer", because input is not integer', () => {
       // Arrange
       ...
       // Act
       ...
       // Assert
    })
})
```

``` describe()``` dan ```it()``` merupakan fungsi milik Mocha, dimana kita akan menulis script test. Pada fungsi ```desribe()``` kita menentukan scope test kita. Didalamnya pada setiap fungsi ```it()``` kita menentukan case-case yang akan kita dilakukan.

Pada kasus diatas, scope kita adalah mengetest fungsi addInteger() dengan 2 case yg telah disepakati, yakni fungsi harus me-return 23, dan fungsi harus mereturn "Number is not integer", karena input yang bakal kita berikan nanti bukan integer.

Pada fungsi ```it()``` bisa dilihat terdapat bagian **Arrange**, **Act** dan **Assert**. Berikut penjelasannya:
1.    **Arrange**\
    Pada bagian arrange biasanya berisikan **inisialisasi input dan inisialisasi doubles** yang bertujuan untuk mengeluarkan output yang diinginkan.
2.    **Act**\
Disini kita melakukan pemanggilan fungsi yang ingin kita test, tentu dengan input yang sudah di-arrange sebelumnya.
3.    **Assert**\
Bagian ini melakukan pengecekan, apakah output sudah sesuai dengan ekspektasi dan fungsional dari fungsi yang di test.

Sekarang kita akan menambahkan potongan kode diatas supaya lengkap.

```javascript
// number-list-test.spec.js
const numberLib = require('./number-lib.js')
const expect = require('chai').expect

describe('Add integer', () => {
    it('should return 23', () => {
       // Arrange
       let x = 11
       let y = 12
       // Act
       let result = numberLib.addInteger(x, y)
       // Assert
       expect(result).to.equal(23)
    })
    it('should return "Number is not integer", because input is not integer', () => {
       // Arrange
       let x = 1.1
       let y = 1.2
       // Act
       let result = numberLib.addInteger(x, y)
       // Assert
       expect(result).to.equal('Number is not integer')
    })
})
```

### Membuat script dengan Doubles
Misal kita update fungsi yang ingin di test seperti ini:
```javascript
function addNumber(x, y) {
    if(isInteger(x) && isInteger(y))) {
        return x + y
    }
    else if(isDecimal(x) && isDecimal(y))) {
        return Math.round(x) + Math.round(y)
    }
    else {
        return 'The input is not integer nor decimal value'
    }
}

function isInteger(x) {
    ...
}

function isDecimal(x) {
    ...
}

modules.export = {
    addInteger
}
```
Betul, ada fungsi didalam fungsi. Konsep dari Unit Test adalah, kita hanya melakukan test terhadap fungsi yang ingin kita test saja. Apabila fungsi tersebut memanggil fungsi lain. Maka fungsi lain kita abaikan dengan menjadikannya Doubles.

Dalam contoh kita tidak akan memperdulikasi fungsi ```isInteger()``` dan fungsi ```isDecimal()```. Kedua fungsi itu akan kita jadikan doubles dengan bantuan sinon. 

Dalam kasus itu ke sepakat bahwa ada 3 case yang akan ditest. Berikut testnya:

```javascript
const sinon = require('sinon')
const expect = require('chai').expect
const numberLib = require('./number-lib')

describe('Add Number', () => {
    it('should return 40', () => {
    })
    it('the input is decimal, should return 15', () => {
    })
    it('should return "The input is not integer nor decimal value"', () => {
    })
})
```
Kita sudah menentukan case nya, sekarang kita tambahkan script testnya:

```javascript
const sinon = require('sinon')
const expect = require('chai').expect
const numberLib = require('./number-lib')

describe('Add Number', () => {
    it('should return 40', () => {
        //Kita membuat stub untuk fungsi isInteger dengan melakukan return true
        let isInteger = sinon.stub(numberLib, 'isInteger').returns(true)
        let x = 20
        let y = 20
        let result = numberLib(x, y)
        expect(result).to.equal(40)
        isInteger.restore()
    })
    it('the input is decimal, should return 15', () => {
        //Kita membuat stub untuk fungsi isInteger menjadi return false 
        //dan isDecimal menjadi return true
        let isInteger = sinon.stub(numberLib, 'isInteger').return(false)
        let isDecimal = sinon.stub(numberLib, 'isDecimal').returns(true)
        let x = 7.4
        let y = 7.6
        let result = numberLib(x, y)
        expect(result).to.equal(15)
        isInteger.restore()
        isDecimal.restore()
    })
    it('should return "The input is not integer nor decimal value"', () => {
        //Kita membuat stub untuk fungsi isInteger menjadi return false 
        //dan isDecimal menjadi return false
        let isInteger = sinon.stub(numberLib, 'isInteger').return(false)
        let isDecimal = sinon.stub(numberLib, 'isDecimal').returns(false)
        let x = 'anything'
        let y = 'anything'
        let result = numberLib(x, y)
        expect(result).to.equal('The input is not integer nor decimal value')
        isInteger.restore()
        isDecimal.restore()
    })
})
```
Pada awal case kita selalu melakukan inisialisasi stub untuk fungsi ```isInteger()``` maupun ```isDecimal()```, dengan mengubah return valuenya sesuai dengan kebutuhan case dari test. Ketika ```numberLib()``` dipanggil, apabila selama eksekusi ditemukan fungsi yang sudah kita stub sebelumnya, fungsi itu akan berubah menjadi stub.

Pada akhir case kita harus melakukan ```restore()``` kepada stub yang sudah kita buat agar fungsi yang menjadi stub kembali menjalankan isinya masing-masing. Apabila tidak dilakukan ```restore()``` ada kemungkinan test selanjutnya akan mengalami kegagalan dikarenakan fungsi-fungsi tersebut masih menjadi stub.

Script test diatas masih bisa dibuat lebih baik dengan fungsi-fungsi mocha yang lain sebagai berikut:

```javascript
...
const numberLib = require('./number-lib')
describe('Add number', () => {
    let isInteger
    let isDecimal
    beforeEach(() => {
        isInteger = sinon.stub(numberLib, 'isInteger')
        isDecimal = sinon.stub(numberLib, 'isDecimal')
    })
    afterEach(() => {
        isInteger.restore()
        isDecimal.restore()
    })
    it('...', () => {
        isInteger.returns(true)
        ...
    })
    it('...', () => {
        ...
    })
    it('...', () => {
        ...
    })
})
```

```beforeEach()``` selalu dipanggil sebelum case dijalankan, sedangkan ```afterEach()``` selalu dipanggil sesuadah case dijalankan. Dengan bantuan ```beforeEach()``` dan ```afterEach()``` code script kita dapat menghindari perulangan inisialisasi dan menjadi lebih mudah dibaca.

### Membuat script test dengan kasus anonymous function
Pada javascript ada kalanya kita menemukan kasus seperti ini:
```javascript
//my-route.js
router.get('/', (req, res) => {
    //fungsi yang ingin kita test
    ...
    ...
})
router.get('/user', (req, res) => {
    //fungsi lain
    ...
    ...
})
module.exports = router
```

Diatas adalah salah satu contoh membuat router pada framework ```express.js```.  Bagaimana cara kita melakukan test pada fungsi tersebut, sedangkan fungsi tersebut tidak bisa kita panggil dari luar? Kita bisa melakukannya dengan bantuan sinon.

Pertama buat test script seperti biasa:

```javascript
const route = ('./my-route')

describe('Route test', () => {
    it('should ...', () =>{
        
    })
})
```
Pada fungsi yang ingin ditest, bisa dilihat, ```router``` memanggil fungsi ```get()``` yang berisi parameter 1 adalah alamat route itu sendiri dan parameter 2 berisi sebuah fungsi (fungsi yang ingin kita test). Jadi kita akan melakukan spy pada fungsi get milik router.
```javascript
const route = require(./my-route)
const sinon = require('sinon')

describe('Route test', () => {
    it('should ...', () => {
      //Buat spy pada get
      let get = sinon.spy(route, 'get')
      // Arrange input 
      let req = {}
      let res = {}
      //Panggil fungsi
      route.router()
      ..
    })
}
```

Ketika ```route.router()``` dipanggil, kedua fungsi di dalamnya (```router.get('/')``` dan ```router.get('/user')```) juga terpanggil. Namun karena kita sedang mengetes fungsi ```get('/')``` alias fungsi get yang **pertama**. Maka codenya akan menjadi berikut:

```javascript
const route = require(./my-route)
const sinon = require('sinon')

describe('Route test', () => {
    it('should ...', () => {
      let get = sinon.spy(route, 'get')
     
      let req = {}
      let res = {}
      
      route.router()
      //Memanggil get yang pertama lalu memanggil fungsi yang terdapat pada argumennya
      get.firstCall.callArgWith(1, req, res)
      
      expect(...)
      get.restore()
    })
}
```

```get.firstCall``` akan mengambil fungsi get yang dipanggil pertama kali. 

Lalu ditambahkan dengan ```get.firstCall.callArgwith(1, req, res)``` akan memanggil fungsi yang terletak pada parameter ke 1 (parameter ke 0 adalah '/') dengan parameter req res. Setelah anonymous function bisa dipanggil assert pun bisa dilakukan.

# Menjalankan Unit Test

Untuk menjalankan script test kita harus melakukan perubahan pada ```package.json```

```javascript
// package.json
"scripts": {  
    "test": "mocha test/**/*.spec.js"
}
```
Script diatas tujuannya adalah menjalankan command mocha untuk semua file di folder test dengan extensi ```.spec.js```. Semua script test disarankan berekstensi ```.spec.js``` agar kita tidak perlu melakukan import fungsi-fungsi mocha (Pada contoh fungsi yang dimaksud adalah ```describe()``` dan ```it()```).

Lalu jalankan scriptnya:
```bash
npm test
```

Di terminal akan ada result testnya seperti ini:

```
> mocha test/**/*.spec.js

  Add Integer
    ✓ should return 23
    ✓ should return "Number is not integer", because input is not integer
    
 2 passing (1s)
```

# Menampilkan report unit test ke jenkins
Untuk menampilkan report pada jenkins dibutuhkan 2 modul yakni [**mocha-junit-reporter**](https://www.npmjs.com/package/mocha-junit-reporter) untuk report unit-test dan [**nyc**](https://www.npmjs.com/package/nyc) untuk code coverage.

```bash
$ npm install mocha-junit-reporter nyc --save-dev
```

Setelah itu tambahkan script ini pada ```package.json``` pada `scripts`.

```javascript
"scripts": {
    "report": "mocha test/**/*.spec.js --reporter mocha-junit-reporter",
    "coverage": "nyc --reporter=lcov --reporter=text-lcov npm test"
},
```

Lalu jalankan:

```bash
$ npm run report
$ npm run coverage
```

Setelah dijalankan, akan menghasilkan file ```.xml``` yang akan digunakan oleh jenkins dalam membuat report.

# Other Reference
Penjelasan doubles secara rinci & secara keseluruhan: 

https://martinfowler.com/articles/mocksArentStubs.html

Penjelasan doubles sinon & tutorial: 

https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/