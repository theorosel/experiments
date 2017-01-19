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
                    value : null,
                    disabled : false
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

                if (!self.boxes[y][x].disabled) {

                    if (!self.state) {
                        self.state = true;
                        self.set_bomb(element);
                        self.create_value();
                        self.box_check(element);
                    }

                    else {
                        self.box_check(element);
                    }
                    // console.log(self.boxes[y][x]);
                }

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
        var $x = parseInt(element.getAttribute('data-x'));
        var $y = parseInt(element.getAttribute('data-y'));
        for (var i = 0; i < this.bombs_number; i++) {
            var x, y;
            do {
                x = Math.floor(Math.random()* this.columns_size);
                y = Math.floor(Math.random()* this.rows_size);
            } while (this.is_mined($x, $y, x, y));

            self.boxes[x][y].is_mined = true;
        }

    }


    /*
     * is_mined()
     * Called in this.set_bomb()
     * Check if bomb already exist in the box
     */
    this.is_mined = function($x, $y, x, y) {
        $x = parseInt($x);
        $y = parseInt($y);

        // console.log($x, $y)
        if (x == $x && y == $y) {
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

            if (x > 0 && x < this.rows_size - 1 && y > 0 && y < this.columns_size - 1) {
                if (self.boxes[y][x-1].is_mined){count++}
                if (self.boxes[y][x+1].is_mined){count++}
                if (self.boxes[y-1][x].is_mined){count++}
                if (self.boxes[y+1][x].is_mined){count++}
                if (self.boxes[y-1][x+1].is_mined){count++}
                if (self.boxes[y-1][x-1].is_mined){count++}
                if (self.boxes[y+1][x+1].is_mined){count++}
                if (self.boxes[y+1][x-1].is_mined){count++}
            }

            else if (x == 0 && y == 0) {
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
            //console.log(count);
            element.value = count;
        }
    }


    /*
     * box_check()
     * Called in this.init()
     * Create value for box according bombs number around it
     */
    this.box_check = function(element) {
        var x = parseInt(element.getAttribute('data-x'));
        var y = parseInt(element.getAttribute('data-y'));

        if (!this.boxes[y][x].disabled) {
            if (this.boxes[y][x].is_mined) {
                element.classList.add('minesweeper-mined');
                this.reveal_mines();
            }

            else if (this.boxes[y][x].value > 0) {
                element.classList.add('minesweeper-safe');
            }

            else if (this.boxes[y][x].value == 0) {
                element.classList.add('minesweeper-safe');
                this.box_check_around(x, y);
            }

            this.write_value(element, x, y);
            this.boxes[y][x].disabled = true;
        }
    }


    /*
     * box_check_around()
     * Called in this.box_check()
     * Check box around clicked box
     */
    this.box_check_around = function(x, y) {
        this.boxes[y][x].obj.classList.add('minesweeper-safe');
        this.write_value(this.boxes[y][x].obj, x, y);
        this.boxes[y][x].disabled = true;
        // console.log(x, y);

        if (x > 0 && x < this.rows_size - 1 && y > 0 && y < this.columns_size - 1) {
            this.box_analyse(x-1, y)
            this.box_analyse(x+1, y)
            this.box_analyse(x, y-1)
            this.box_analyse(x, y+1)
            this.box_analyse(x+1, y-1)
            this.box_analyse(x-1, y-1)
            this.box_analyse(x+1, y+1)
            this.box_analyse(x-1, y+1)
        }

        else if (x == 0 && y == 0) {
            this.box_analyse(x, y+1)
            this.box_analyse(x+1, y)
            this.box_analyse(x+1, y+1)
        }

        else if (x == 0 && y == this.rows_size - 1) {
            this.box_analyse(x, y-1)
            this.box_analyse(x+1, y)
            this.box_analyse(x+1, y-1)
        }

        else if (x == this.columns_size - 1 && y == 0) {
            this.box_analyse(x, y+1)
            this.box_analyse(x-1, y)
            this.box_analyse(x-1, y+1)
        }

        else if (x == this.columns_size - 1 && y == this.rows_size -1) {
            this.box_analyse(x, y-1)
            this.box_analyse(x-1, y)
            this.box_analyse(x-1, y-1)
        }

        else if (x == 0) {
            this.box_analyse(x, y-1)
            this.box_analyse(x, y+1)
            this.box_analyse(x+1, y-1)
            this.box_analyse(x+1, y+1)
            this.box_analyse(x+1, y)
        }

        else if (y == 0) {
            this.box_analyse(x-1, y)
            this.box_analyse(x+1, y)
            this.box_analyse(x-1, y+1)
            this.box_analyse(x+1, y+1)
            this.box_analyse(x, y+1)
        }
        else if (x == this.rows_size - 1) {
            this.box_analyse(x, y-1)
            this.box_analyse(x, y+1)
            this.box_analyse(x-1, y-1)
            this.box_analyse(x-1, y+1)
            this.box_analyse(x-1, y)
        }

        else if (y == this.columns_size - 1) {
            this.box_analyse(x-1, y)
            this.box_analyse(x+1, y)
            this.box_analyse(x-1, y-1)
            this.box_analyse(x+1, y-1)
            this.box_analyse(x, y-1)
        }

    }


    /*
     * box_analyse()
     * Called in box_check_around()
     *
     */
    this.box_analyse = function(x, y) {
        if (!this.boxes[y][x].is_mined && (this.boxes[y][x].value != 0)) {
            this.boxes[y][x].obj.classList.add('minesweeper-safe');
            this.write_value(this.boxes[y][x].obj, x, y);
            this.boxes[y][x].disabled = true;
        }

        else if (this.boxes[y][x].value == 0 && !this.boxes[y][x].is_mined && !this.boxes[y][x].disabled ) {
            this.box_check_around(x, y);
        }
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
        // console.log(count);

        if (this.boxes[y][x].value > 0) {
            count.innerHTML = this.boxes[y][x].value;
        }
    }


    /*
     * reveal_mines()
     * Called in box_check()
     * Reveal all box of the map
     */
    this.reveal_mines = function() {
        for (var y = 0; y < this.boxes.length; y++) {
            for (var x = 0; x < this.boxes.length; x++) {
                if (this.boxes[y][x].is_mined) {
                    console.log(this.boxes[y][x]);
                    this.boxes[y][x].obj.classList.add('minesweeper-mined');
                }

                else if (!this.boxes[y][x].obj.classList.contains('minesweeper-mined')) {
                    this.boxes[y][x].obj.classList.add('minesweeper-safe');
                }

                this.boxes[y][x].disabled = true;
            }
        }
    }


}


/*
 * Minesweeper instance
 */
var minesweeper = new Minesweeper(document.querySelector('.app'));
minesweeper.init();
