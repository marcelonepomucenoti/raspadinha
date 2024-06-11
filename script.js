window.onload = function() {
    const canvases = document.querySelectorAll('.scratchCanvas');
    canvases.forEach((canvas, index) => {
        const ctx = canvas.getContext('2d');
        const img = canvas.parentElement.querySelector('.hiddenImage');

        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;

        // Preencher o canvas com a cor cinza
        ctx.fillStyle = '#d3d3d3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenhar o texto "Raspe aqui" no canvas com estilo melhorado
        ctx.font = "bold 16px 'Comic Sans MS', cursive, sans-serif";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;
        ctx.fillText("Raspe aqui", canvas.width / 2, canvas.height / 2);

        // Definir o modo de composição para destination-out
        ctx.globalCompositeOperation = 'destination-out';

        let isDrawing = false;

        function getMousePos(canvas, evt) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        function getTouchPos(canvas, touch) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        }

        function startDrawing(e) {
            isDrawing = true;
            draw(e);
        }

        function endDrawing() {
            isDrawing = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!isDrawing) return;

            e.preventDefault();

            const pos = e.type.includes('mouse') ? getMousePos(canvas, e) : getTouchPos(canvas, e.touches[0]);

            ctx.lineWidth = 15;
            ctx.lineCap = 'round';

            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchend', endDrawing);
        canvas.addEventListener('touchmove', draw);
    });
};
