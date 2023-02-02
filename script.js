let formValidator = {
    handleSubmit: (event) =>{
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        formValidator.clearErrors();

        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];

            let check = formValidator.checkInput(input);

            if(check !== true){
                send = false;
                formValidator.showErro(input, check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput: (input)=>{
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');
            for (let k in rules){
                let rulesDetails = rules[k].split('=');
                switch(rulesDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'O campo não pode ser vazio.';
                        }
                        break;

                    case 'min':
                        if(input.value.length < rulesDetails[1]){
                            return  'O campo tem que ter pelo menos '+rulesDetails[1]+' caracteres ';
                        }
                        break;

                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'O e-mail digitado não é valido!';
                            }
                        }
                        break;
                }
            }
        } return true;
    },
    showErro: (input, error) => {
        input.style.borderColor = '#A6032F'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {

        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i<errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}

let form = document.querySelector('.validator');

form.addEventListener('submit', formValidator.handleSubmit);