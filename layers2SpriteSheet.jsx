// Checking that there is at least one document open
if (documents.length > 0) 
{
    app.preferences.rulerUnits = Units.PIXELS;

    var dialog = new Window("dialog", "Layers to Sprite Sheet");
    dialog.add("statictext", undefined, "Choose number of resultant Columns (min. 1, max. the number of selected layers)");

    var sliderGroup = dialog.add("group");
    var sliderText = sliderGroup.add("statictext", undefined, "1");
    var slider = sliderGroup.add("slider", undefined, 1, 1, activeDocument.artLayers.length);
    slider.onChanging = function() {
    sliderText.text = Math.round(slider.value).toString();
    };

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "right";
    buttonGroup.add("button", undefined, "OK", { name: "ok" });
    buttonGroup.add("button", undefined, "Cancel", { name: "cancel" });

    if (dialog.show() == 1) {
        var numberOfColums = Math.round(slider.value);
        var xWidthPerSprite = activeDocument.width;
        var YWidthPerSprite = activeDocument.height;	
        
        var spriteSheetWidth = xWidthPerSprite * numberOfColums;
        var selectedLayers = activeDocument.artLayers.length; 	
        var spriteSheetHeight = YWidthPerSprite * Math.ceil(selectedLayers/numberOfColums);	

        activeDocument.resizeCanvas(spriteSheetWidth, spriteSheetHeight, AnchorPosition.TOPLEFT);
        
        i = 0;

        do 
        { 
            activeDocument.artLayers[i].visible = true;
            var selectedSprite = Math.floor(i/numberOfColums);
            var YSpritePos = YWidthPerSprite*selectedSprite;	
            var XSpritePos = xWidthPerSprite*(i%numberOfColums);
            activeDocument.artLayers[i].translate(XSpritePos, YSpritePos);

            i++;
        }while(i < selectedLayers);
    }else{
        // Error message
        alert("Error, number of columns must be greater than 0.");
    }
}else{
    // Error message
    alert("Error, at least one document must be opened to launch the script.");
}
 	
