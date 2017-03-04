
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

    var self = this;


    window.setInterval( function(){

        self.loop(self.direction);

    }, 50);


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
        $zelda.classList.add ('zelda');
        $zelda.classList.add ('bottom');

        this.$el.game_area.appendChild($zelda);
        this.$el.zelda = this.$el.container.querySelector('.zelda');
        this.pos_x     = pos_x;
        this.pos_y     = pos_y;

        // console.log(this.$el.zelda.getAttribute('class').split(' ')[1]);
    }




    /*
     * create_zelda()
     * Called in this.init()
     * Create zelda and place it randomly on the map
     */
    this.loop = function(direction) {

        var $zelda        = this.$el.zelda,
            current_class = $zelda.getAttribute('class').split(' ')[1];

        if (direction == 'top') {
            this.top();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add ('top');
        }

        else if (direction == 'right') {
            this.right();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add('right');
            // this.$el.zelda.style.backgroundPosition = "left -65px";
        }

        else if (direction == 'down') {
            this.down();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add ('down');
        }

        else if (direction == 'left') {
            this.left();
            this.$el.zelda.classList.remove (current_class);
            this.$el.zelda.classList.add ('left');
        }
    }


    /*
     * this.top();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.top = function() {

        this.pos_y -= 5;
        this.pos_x;
        this.$el.zelda.style.top = this.pos_y +'px';
    }


    /*
     * this.right();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.right = function() {

        console.log('right');
        this.pos_x += 5;
        this.$el.zelda.style.left = this.pos_x +'px';
    }


    /*
     * this.down();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.down = function() {

        console.log('down');
        this.pos_y += 5;
        this.$el.zelda.style.top = this.pos_y +'px';
    }


    /*
     * this.left();
     * Called in this.loop()
     * Move Zelda according to the direction
     */
    this.left = function() {

        console.log('left');
        this.pos_x -= 5;
        this.$el.zelda.style.left = this.pos_x +'px';
    }
}



var app = new App(document.querySelector('.app'));

app.init();
