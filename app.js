'use strict';
const urlInput = document.querySelector('input');
const downloadBtn = document.querySelector('.download__btn');
const previewModal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close__btn');
const confirmContainer = document.querySelectorAll('.confirm__container');
const modalContext = document.querySelector('.modal__context');
downloadBtn.addEventListener('click', e => {
	if (urlInput.value === '') return; // exits code if input field is empty
	e.preventDefault(); // prevents default behaviour of button
	// Fetch file and return response as a blob
	fetch(urlInput.value)
		.then(resp => resp.blob())
		.then(data => {
			console.log(data);
			let tempURL = URL.createObjectURL(data); // create a URL for passed object
			let attrTag = document.createElement('a'); // create <a> tag
			document.body.appendChild(attrTag); // adding <a> tag to the body of the document
			attrTag.href = tempURL; // passing tempURL to href of <a> tag
			attrTag.download = urlInput.value.replace(/^.*[\\\/]/, ''); // passing 'filename' as the value of download
			attrTag.click(); // automatically clicking the <a> tag so the file is downloaded
			attrTag.remove(); // removes <a> Tag when download is finished
			URL.revokeObjectURL(tempURL);
		});
});

closeBtn.addEventListener('click', () => {
	previewModal.classList.toggle('hidden');
});
