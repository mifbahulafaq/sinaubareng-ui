//promise adalah sebuah object yang merepresentasikan keberhasilan / kegagalan dari sebuah event yang asyncronus di di masa yang akan datang
//dan yang namanya JANJI/Promis pasti ada dua(terpenuhi/ingkar)
//STATES(fullfilled/rejected/pending) : dan di JS janji, biasa di sebut dengan states keadaanya klo terpenuhi disebut fullfilled, klo diingkari rejeckted, dan pending
//callback (resolve/rejeck/finally) : dan untuk menjalankan keadaan ini ada fungi callback yg harus di ingat resolve ini ketika janjinya sudah terpenuhi, reject dibuat ketika janji nya tdk terpenuhi, dan ada finally ini ketika waktu tunggunya tidak selesai
//aksi(then/catch) : dipromis ada aksi yangakan kita lakukan ketika janjinya terpenuhi atau tidak terpenuhi, klo terpebuhi kita sebut dengan then, klo tidak terpenuhi disebut catch, jadi then menjalankan resole, dan catch menjalankan rejeck

// const a = true;
// const coba = new Promise((resolve,reject)=>{
//     a?resolve('berhasil'):reject('gagal')
// })

// coba.then(data=>console.log(data)).catch(data=>console.log(data))
// console.log(coba)







//contoh promise yang sederhana
//ingat! promise yang kita pakai, biasanya ketika kita mau request sebuah API
//tpi contoh promis inihanya untuk contoh saja, tdk request ke api

//contoh 1
//karna object jadi pakai new, obj ini punya 2 parameter
// let ditepati = true;
// const janji1 = new Promise((resolve,reject)=>{

//     if(ditepati){
//         resolve('janji telah di tepati');//ini bisa request ke API, bisa menjalankan proses yg kompleks,dll
//     }else{
//         reject('ingkar janji');
//     }

// })

// console.log(janji1.then(r=>console.log(r)));// akan menjalankan defaultnya , bentuknya adalah Promise, yg isinya resole yg isinya janji di tepati, karena true
// //kalau mau tangkap resolve dan reject nya, kalian bisa console.lognya di dalam method than dan cath
// janji1.then(response => console.log(`Ok!, ${response}`))//ini namanya(respone) terserah, jadi respone adalah apapun yg dihasilkan oleh resolve tsb.//maka dia akan ngambil resolve nya
// //kalo gagal
// .catch(response => console.log(`not ok,${response}`));
//dan ini hasilnya adalah : 'ok!, janji telah di tepati', karna variabel ditepati menghasilkan true, jika ditepati berisi false, maka yg ditampilkan adalah cacht, yaitu rejectnya








//contoh 2
//kita bikin janjnya tidak langsung ditepati, kita pendingkan dulu
let ditepati = true;
const janji2 = new Promise((resolve,reject)=>{
    if(ditepati){
        //kita bikin menunggu dulu
        setTimeout(()=> resolve('janji di tepati tapi setelah beberapa waktu'),2000);
    }else{
        setTimeout(()=> reject('tidak di tepati setelah beberapa waktu'),2000);
    }
})

async function run(){
	

// // //supaya keliatan asinkronus, kita bisa gini
console.log('mulai');
//const result = janji2;//hasilnya : promisnya pending dan gk selesai2,karna kita blum jalankan thenya
//console.log(result)
// //atau
// console.log(janji2.then(()=> console.log(janji2)).catch(()=>console.log(janji2)));//misal begini, jadi ini (janji2.then) mlai kita jalanin, dan ini(console.log(janji2))) saat promisnya sudah dijalannin
// //atau
// //misal kita tambah method finally, jadi ini dijalnkan ketika salah satu dari then/catch inisudah siap dijalnkan, atau klo promisenya tidak pending lagi finally dulu dijalankan baru then/catch
 janji2
 .finally(()=>console.log(`selesai menunggu`))
 .then(respone=>console.log(janji2))
 .catch(respone=>console.log(janji2));
console.log('selesai');
}
run()







//contoh terakhir
//di promis ada method yang namanya all
//Promise.all ini untuk menjalankan ketika kita punya banyak promise yng mau dijalanin sekaligus

//contoh kasus, 
//anggap aja kalian akan konek ke 2 API yg berbeda

//API pertama, untuk memanggil data film:
//saya punya variabel film yg merupakan promise, yg diambil hanya resolvenya saja, klo misal data filmnya sudah didapatkan, misal kita kasih waktu, jadi ketika sudh beberapa detik, kita jalankan callback function baru kita resolve , misal pas konek kita dapatkan data berupa json

// const film = new Promise(resolve => {

//     setTimeout(()=>{
//         resolve([{
//             judul : 'avenger',
//             sutradara : 'mifbahulafaq'
//         }])
//     },1000)
// } );


//selanjutnya, kita mau konek ke API yg lain
//misal cuaca:
//saya punya variabel cuaca, dia promis dia menjalankan resolve yg parameternya berupa json array of object

// const cuaca = new Promise(resolve=>{
//     setTimeout(()=>{
//         resolve([{
//             kota : 'bandung',
//             temp : 26
//         }])
//     },500)
// })

//misalkan kita jalanin satu2, berarti tnggal begini
// film.then(respone=>console.log(respone));
// cuaca.then(respone=>console.log(respone));

//nahh misal mau jalankan sekaligus, tinggal kita pakai method all
// Promise.all([film,cuaca])//jadi jalankan beberapa promise sekaligus, didalmnya kita bisa simpan array, yg menyimpan promis2nya
// .then(respone=>console.log(respone));//jadi hasilnya array didalam array, klo kalian mau terpisah, kita bisa menggunakan destructuring, jadi begini
// .then(respon =>{
//     const[a,b] = respon;
//     console.log(a);
//     console.log(b);
// })









//jadi menggunakan Promise itu menyelesaikan masalah callback hell ya, klo misalkan kita punya callback yg banyak, dengan menggunakan promise kita bisa persingkat menjadi beberapa baris

