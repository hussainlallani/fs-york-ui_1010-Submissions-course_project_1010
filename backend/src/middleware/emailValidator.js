 // validEmail('admin@gmail.com') //true
    // validEmail('admin@my-large-domain.news') //true
    // validEmail('admin@comercio.com.pe') //true
    // validEmail('elonmusk@x.com') // true (short domain)
    // validEmail('ud@se.cz') // true (short domain)
    // validEmail('admin@mycompany.technology') // true (large extension)
    // validEmail('.admin@gmail.com') //false (not initial dot)
    // validEmail('admin--admin@gmail.com') //false (not dashes followed)
    // validEmail('admin@-myapp-.com') //false (not dashes initial and end)
export const isEmailValid = (str) => {
    return !/(\.{2}|-{2}|_{2})/.test(str) && /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    .test(str)
}



