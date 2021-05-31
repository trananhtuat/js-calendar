let getName = async () => {
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
        text: `Your Name is ${Name}`,
        icon: "success",
    });
    }
    
	return Name;
}

getName().then(
	(data)=>{
		let node = document.createElement('DIV');
		node.classList.add('userName');
		node.innerHTML = `Welcome ${data}`;
		document.querySelector('body').insertBefore(node,document.querySelector('body').childNodes[0]);
	})