/*
 * minesweeper
 */
function Minesweeper (element) {

    this.$el                 = {};
    this.$el.container       = element;
    this.$el.minesweeper     = this.$el.container.querySelector('.minesweeper');
    this.$el.boxes           = null;
    this.state               = false;

    this.boxes               = [];
    this.bomb_positions      = [];

    this.rows_size           = 10;
    this.columns_size        = 10;
    this.bombs_number        = 9;


    /*
     * Init ()
     * Called when DOM content is fully loaded
     * Create the minesweeper's map
     */
    this.init = function() {

        for (var y = 0; y < this.columns_size; y++) {

            var row  = [];
            var $row = document.createElement('div');
            $row.classList.add('minesweeper-row');

            for (var x = 0; x < this.rows_size; x++) {

                var $box = document.createElement('div');
                $box.classList.add('minesweeper-box');
                $box.setAttribute('data-x', x);
                $box.setAttribute('data-y', y);

                var $value = document.createElement('div');
                $value.classList.add('minesweeper-box-value');
                $box.appendChild($value);


                $row.appendChild($box);

                var box = {
                    obj: $box,
                    x : x,
                    y : y,
                    is_mined : false,
                    value : null
                }
                row.push(box);
            }
            this.boxes.push(row);
            this.$el.minesweeper.appendChild($row);
        }

        this.$el.boxes = this.$el.minesweeper.querySelectorAll('.minesweeper-box');

        var self = this;

        for (var i = 0; i < this.$el.boxes.length; i++) {
            this.$el.boxes[i].addEventListener('click', function (event) {
                var element = event.srcElement;
                var x   = element.getAttribute('data-x');
                var y   = element.getAttribute('data-y');

                if (!self.state) {
                    self.state = true;
                    self.set_bomb(element);
                    self.create_value();
                }
                else {
                    // self.explore(element);
                    self.box_check(element);
                }
                console.log(self.boxes[y][x]);
            });
        }
    }


    /*
     * set_bomb()
     * Called in this.init()
     * Put bombs randomly all around the map
     */
    this.set_bomb = function(element) {
        var self = this;
        var $x = element.getAttribute('data-x');
        var $y = element.getAttribute('data-y');

        for (var i = 0; i < this.bombs_number; i++) {
            var x, y;
            do {
                x = Math.floor(Math.random()* this.columns_size);
                y = Math.floor(Math.random()* this.rows_size);
            } while (this.is_mined($x, $y, x, y));

            self.boxes[x][y].is_mined = true;
            // self.boxes[x][y].obj.style.background = 'black';
        }

    }


    /*
     * is_mined()
     * Called in this.set_bomb()
     * Check if bomb already exist in the box
     */
    this.is_mined = function($x, $y, x, y) {
        $x = null;
        $y = null;

        if ($x == x && $y == y) {
            return true
        }
        else {
            return this.boxes[y][x].is_mined;
        }
    }


    /*
     * explore()
     * Called in this.create_value()
     * Explore each box around the box clicked
     */
    this.explore = function(element, x, y) {
        var self  = this;
        var x     = parseInt(x);
        var y     = parseInt(y);

        if (!element.is_mined) {
            var count = 0;
            if (x == 0 && y == 0) {
                if (self.boxes[y+1][x].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
                if (self.boxes[y+1][x+1].is_mined){count++}
            }
            else if (x == 0 && y == this.rows_size - 1) {
                if (self.boxes[y-1][x].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
                if (self.boxes[y-1][x+1].is_mined){count++}
            }

            else if (x == this.columns_size - 1 && y == 0) {
                if (self.boxes[y+1][x].is_mined){count++}
                if (self.boxes[y][x-1].is_mined){count++}
                if (self.boxes[y+1][x-1].is_mined){count++}
            }

            else if (x == this.columns_size - 1 && y == this.rows_size -1) {
                if (self.boxes[y-1][x].is_mined){count++}
                if (self.boxes[y][x-1].is_mined){count++}
                if (self.boxes[y-1][x-1].is_mined){count++}
            }

            else if (x == 0) {
                if (self.boxes[y-1][x].is_mined){count++}
                if (self.boxes[y+1][x].is_mined){count++}
                if (self.boxes[y-1][x+1].is_mined){count++}
                if (self.boxes[y+1][x+1].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
            }

            else if (y == 0) {
                if (self.boxes[y][x-1].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
                if (self.boxes[y+1][x-1].is_mined){count++}
                if (self.boxes[y+1][x+1].is_mined){count++}
                if (self.boxes[y+1][x].is_mined){count++}
            }

            else if (x == this.rows_size - 1) {
                if (self.boxes[y-1][x].is_mined){count++}
                if (self.boxes[y+1][x].is_mined){count++}
                if (self.boxes[y-1][x-1].is_mined){count++}
                if (self.boxes[y+1][x-1].is_mined){count++}
                if (self.boxes[y][x-1].is_mined){count++}
            }

            else if (y == this.columns_size - 1) {
                if (self.boxes[y][x-1].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
                if (self.boxes[y-1][x-1].is_mined){count++}
                if (self.boxes[y-1][x+1].is_mined){count++}
                if (self.boxes[y-1][x].is_mined){count++}
            }

            else if (x > 0 && x < this.rows_size - 1 && y > 0 && y < this.columns_size - 1) {
                if (self.boxes[y][x-1].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
                if (self.boxes[y-1][x].is_mined){count++}
                if (self.boxes[y+1][x].is_mined){count++}
                if (self.boxes[y-1][x+1].is_mined){count++}
                if (self.boxes[y-1][x-1].is_mined){count++}
                if (self.boxes[y+1][x+1].is_mined){count++}
                if (self.boxes[y+1][x-1].is_mined){count++}
            //   console.log(count);
            }

            element.value = count;
        }
    }


    /*
     * box_check()
     * Called in this.init()
     * Create value for box according bombs number around it
     */
    this.box_check = function(element) {
        var x = element.getAttribute('data-x');
        var y = element.getAttribute('data-y');

        if (this.boxes[y][x].is_mined) {
            element.classList.add('minesweeper-mined');
        }
        else if (this.boxes[y][x].value > 0) {
            element.classList.add('minesweeper-safe');
        }
        else if (this.boxes[y][x].value == 0) {
            element.classList.add('minesweeper-safe');
        }

        this.write_value(element, x, y);
    }


    /*
     * create_value()
     * Called in this.init()
     * Create value for box according bombs number around it
     */
    this.create_value = function() {
        for (var y = 0; y < this.boxes.length; y++) {
            for (var x = 0; x < this.boxes.length; x++) {
                this.explore(this.boxes[y][x], x, y);
            }
        }
    }


    /*
     * write_value()
     * Called in box_check()
     * Get value of box according bombs number around it
     * and write it in box DOM element
     */
    this.write_value = function(element, x, y) {
        var count = element.firstChild;
        console.log(count);
        count.innerHTML = this.boxes[y][x].value;
    }
}


/*
 * Minesweeper instance
 */
var minesweeper = new Minesweeper(document.querySelector('.app'));
minesweeper.init();
