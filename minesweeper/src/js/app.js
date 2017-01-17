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

                self.boxes[y][x].is_mined = true;
            });
        }
    }
}


/*
 * Minesweeper instance
 */
var minesweeper = new Minesweeper(document.querySelector('.app'));
minesweeper.init();
