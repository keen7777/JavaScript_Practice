// js code
        // storage layer:
        function saveToLocal(key, cal) {
            localStorage.setItem(key, cal);
        }

        function loadFromLocal(key, defaultValue = {}) {
            const data = localStorage.getItem(key);
            return data ? data : defaultValue;
        }

        function removeFromLocal(key) {
            localStorage.removeItem(key);
        }

        function addingChar(s) {
            calculation += s;
            console.log(calculation);
        }

        function clearCalculation(s) {
            calculation = '';
            console.log(calculation);
        }

        function evaluateCalculation() {
            calculation = eval(calculation);
            console.log(calculation);
        }

        function displayCalculation() {
            document.querySelector('.show-formula').innerHTML = calculation;
        }



        // variables:
        let calculation = loadFromLocal('calculation', "");
        displayCalculation();


        // 2nd using event delegation ===================
        document.body.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            // only for buttons.
            if (!button) {
                return;
            }

            const current_type = button.dataset.typ;

            // 

            if (current_type === 'reset') {
                clearCalculation();
                removeFromLocal('calculation');
                displayCalculation();
            }

            if (current_type === 'operation') {
                const current_char = button.dataset.op;
                addingChar(` ${current_char} `);
                displayCalculation();
                saveToLocal('calculation',calculation );
            }

            if (current_type === 'number') {
                const current_char = button.dataset.num;
                addingChar(current_char);
                displayCalculation();
                saveToLocal('calculation',calculation);
            }

            if (current_type === 'dot') {
                const current_char = button.dataset.dot;
                addingChar(current_char);
                displayCalculation();
                saveToLocal('calculation',calculation);
            }


            if (current_type === 'evaluation') {
                evaluateCalculation();
                displayCalculation();
                saveToLocal('calculation',calculation);
            }

        }); // 2nd

        //we still need to add some rules for that, especially after evaluation, the result, and the op rules. 

        //add on key up to display the formula in sync.

