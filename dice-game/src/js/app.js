/*
 * Game Object
 */
function Game (element) {

    // Object DOM elem
    this.$el 		    = {};
    this.$el.container  = element;
    this.$el.dice       = this.$el.container.querySelectorAll('.dice');
    this.$el.run_button = this.$el.container.querySelector('.run-button');

    // Object data values
    this.dices          = this.$el.dice.length;
    this.pos_x          = [0, 1, 2, 3, 4, 5, 6];
    this.pos_y          = [0, 1, 2, 3, 4, 5, 6];
    this.positions      = [];
    this.saved_dices    = [];
    console.log(this.dices);

    this.init = function(element) {

    };


    /*
     * run()
     * Roll all dices when user click throw button
     */
    this.run  = function() {
        // Refresh all couple of x, y positions
        this.positions = [];

        // Generate x, y couple of positions for each dice
        for (var i = 0; i < this.dices; i++) {

            if (! this.$el.dice[i].classList.contains('saved')) {

                var x,y;
                var dice         = this.$el.dice[i].childNodes[0].nextSibling;

                // Remove all classes matching with prefix on dice elements
                this.remove_classes(dice, 'dice-');

                do {
                    x = this.alea(this.pos_x);
                    y = this.alea(this.pos_y);
                    
                    var dice_pos = 'x:' + x + 'y:' + y;

                }
                while (this.positions.indexOf(dice_pos) !== -1);

                // Increment positions array
                this.positions.push(dice_pos);

                // Add class 'x-' & 'y-' on dice element
                this.$el.dice[i].classList.add('x-' + x);
                this.$el.dice[i].classList.add('y-' + y);

                // Generate random count + rotation
                var random_count = Math.floor(Math.random() * 6) + 1;
                var random_roll  = Math.floor(Math.random() * 180);

                dice.classList.add('dice-' + random_count);
                dice.style.transform = 'Scale(0.75) rotate(' + random_roll + 'deg)';
                dice.setAttribute('data-rotate', random_roll);
            }
        }

    };


    /*
     * take_pos (dice_pos : string)
     * Check if a couple of positions x, y already exists
     */
    /*this.take_pos = function(dice_pos) {
        for (var i = 1; i < this.positions.length; i++) {

            if (dice_pos[i] === dice_pos) {
                return true;
            }
        }
        return false;
    }*/
    

    /*
     * save_dice (el : object )
     * Add or delete a dice in save_dice array
     */
    this.save_dice = function(el){
        var dice         = el.childNodes[0].nextSibling;

        if(! el.classList.contains('saved')) {
            el.classList.add('saved');
            this.saved_dices.push(el);

            dice.style.transform = 'Scale(0.75) rotate(0deg)';
        }
        else {
            el.classList.remove('saved');
            this.remove_classes(el, 's-');

            var random_roll = dice.getAttribute('data-rotate');
            dice.style.transform = 'Scale(0.75) rotate(' + random_roll +'deg)';


            var index = this.saved_dices.indexOf(el);
            this.saved_dices.splice(index, 1);
        }

        this.replace_save_dices();
    }


    /*
     * replace_save_dices()
     * Delete all 's-' classes for each dice in saved_dices array
     * and re add classes 's-' with new position in array
     */
    this.replace_save_dices = function() {

        for (var i = 0; i < this.saved_dices.length; i++) {
            this.remove_classes(this.saved_dices[i], 's-');
        }

        for (var i = 0; i < this.saved_dices.length; i++) {
            this.saved_dices[i].classList.add('s-' + i);
        }
    }


    /*
     * reset_dice()
     * reset all x, y positions for each dice
     * which not already saved
     */
     this.reset_dice = function() {
         for (var i = 0; i < this.dices; i++) {
             this.remove_classes(this.$el.dice[i], 'x-');
             this.remove_classes(this.$el.dice[i], 'y-');
        }
     }


    /*
     * remove_classes (object : object, prefix : string)
     * remove all classes matching with prefix
     */
    this.remove_classes = function(object, prefix) {
        var classes = object.className.split(" ").filter(function(el) {
            return el.lastIndexOf(prefix, 0) !== 0;
        });
        object.className = classes.join(" ").trim();
    }


    /*
     * alea(array : array)
     * Generate random int in array
     */
    this.alea = function(array) {
        return Math.floor(Math.random() * array.length);
    }
}




/*
 * Game Instance
 */
var game = new Game(document.querySelector('.wrapper'));


/*
 * Game event listener
 */
game.$el.run_button.addEventListener('click', function () {
    game.reset_dice();

    setTimeout(function() {
        game.run();
    }, 500);
});

// Run game when press enter or space
addEventListener('keypress', function (key_to_press) {
    if (key_to_press.which == 13 || 32) {
        game.reset_dice();

        setTimeout(function() {
            game.run();
        }, 500);
    }
});


for (var i = 0; i < game.dices; i++) {
    game.$el.dice[i].addEventListener('click', function() {
        game.save_dice(this);
    });
}
