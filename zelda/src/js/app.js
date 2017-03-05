
function App (element) {

    // $DOM elements
    this.$el            = {};
    this.$el.container  = element;
    this.$el.score      = this.$el.container.querySelector('.score');
    this.$el.game_area  = this.$el.container.querySelector('.game-area');
    this.$el.zelda      = null;

    // $Data
    this.score          = 0;
    this.speed          = null;
    this.direction      = null;
    this.pos_x          = 0;
    this.pos_y          = 0;
    this.movement       = 1;

    var self = this;


    window.setInterval( function(){

        self.loop(self.direction);
        self.zelda_movement(self.movement);

    }, 500);


    /*
     * Keypress Listener
     * Change the direction of zedla's move
     */
    window.addEventListener('keypress', function (e) {

        var ev = e.keyCode;

        if(ev == 122 ) {
            self.direction = 'top';
        }

        else if(ev == 100) {
            self.direction = 'right';
        }

        else if(ev == 115) {
            self.direction = 'down';
        }

        else if(ev == 113) {
            self.direction = 'left';
        }
    });


    /*
     * init()
     * Called when DOM is fully loaded
     */
    this.init = function() {

        this.create_zelda();
        this.ressource_pop();
    }


    /*
     * create_zelda()
     * Called in this.init()
     * Create zelda and place it randomly on the map
     */
    this.create_zelda = function() {

        var $zelda = document.createElement('div'),
            long   = this.$el.game_area.getBoundingClientRect().width,
            larg   = this.$el.game_area.getBoundingClientRect().height,
            pos_x  = Math.floor(Math.random() * long),
            pos_y  = Math.floor(Math.random() * larg);


        $zelda.setAttribute("class", "zelda");

        $zelda.style.top = pos_y + 'px';
        $zelda.style.left = pos_x + 'px';

        this.$el.game_area.appendChild($zelda);
        this.$el.zelda = this.$el.container.querySelector('.zelda');
        this.pos_x     = pos_x;
        this.pos_y     = pos_y;
    }


    /*
     * ressource_pop()
     * Called in ...
     * Create ressource and place it randomly on the map when
     * the previous is recovered
     */
    this.ressource_pop = function() {

        var $ressource = document.createElement('div'),
            long       = this.$el.game_area.getBoundingClientRect().width,
            larg       = this.$el.game_area.getBoundingClientRect().height,
            pos_x      = Math.floor(Math.random() * long),
            pos_y      = Math.floor(Math.random() * larg);


        $ressource.setAttribute("class", "ressource");

        $ressource.style.top = pos_y + 'px';
        $ressource.style.left = pos_x + 'px';

        this.$el.game_area.appendChild($ressource);
        this.$el.zelda = this.$el.container.querySelector('.zelda');
        this.pos_x     = pos_x;
        this.pos_y     = pos_y;
    }


    /*
     * loop(direction : string)
     * Called window.setInterval
     * Moving zelda according to the direction
     */
    this.loop = function(direction) {

        var $zelda        = this.$el.zelda,
            current_class = $zelda.getAttribute('class').split(' ')[1];


        if (direction == 'top') {
            this.top();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add ('dir_top_' + this.movement + '');
        }

        else if (direction == 'right') {
            this.right();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add('dir_right_' + this.movement + '');
            // this.$el.zelda.style.backgroundPosition = "left -65px";
        }

        else if (direction == 'down') {
            this.down();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add ('dir_down_' + this.movement + '');
        }

        else if (direction == 'left') {
            this.left();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add ('dir_left_' + this.movement + '');
        }
    }


    /*
     * top();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.top = function() {

        this.pos_y -= 5;
        this.pos_x;
        this.$el.zelda.style.top = this.pos_y +'px';
    }


    /*
     * right();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.right = function() {

        console.log('right');
        this.pos_x += 5;
        this.$el.zelda.style.left = this.pos_x +'px';
    }


    /*
     * down();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.down = function() {

        console.log('down');
        this.pos_y += 5;
        this.$el.zelda.style.top = this.pos_y +'px';
    }


    /*
     * left();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.left = function() {

        console.log('left');
        this.pos_x -= 5;
        this.$el.zelda.style.left = this.pos_x +'px';
    }


    /*
     * zelda_movement(movement : number);
     * Called window.setInterval()
     * Increment movement to change zelda's movements
     */
    this.zelda_movement = function(movement) {

        if (self.movement >= 3) {
            self.movement = 1;
        }

        else {
            self.movement += 1;
        }
    }
}



var app = new App(document.querySelector('.app'));
app.init();
