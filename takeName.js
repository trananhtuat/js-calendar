let userName;

(async () => {

    const { value: Name } = await Swal.fire({
      title: 'Enter your Name',
      input: 'text',
      inputLabel: 'Your Name Please',
      showCancelButton: false,
      icon: 'info',
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    if (Name) {
      Swal.fire({
        title: "Thank You!",
        text: `You Name is ${Name}`,
        icon: "success",
    })
    userName = name;
    }
    
})()


    console.log(userName)