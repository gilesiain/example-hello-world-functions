
var file_data;
var file_name;

function file_input_change(value) {
    if (value) {
        file_name_split = value.name.split('.')
        file_name = file_name_split[0]
        file_type = file_name_split[1]
        if (file_type === 'glb') {
            file_load(value)
        }
    }
}

function file_load(file_glb) {
    var canvas = document.getElementById("renderCanvas");
    var engine = null;
    var scene = null;
    var sceneToRender = null;
    var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
    var createDefaultScene = function () {
        // Setup the scene
        var scene = new BABYLON.Scene(engine);
        scene.useRightHandedSystem = true
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
        var camera = new BABYLON.ArcRotateCamera(
            "camera1",
            -(Math.PI / -1.7),
            Math.PI / 2,
            3.7,
            new BABYLON.Vector3(0, -0.1, 0),
            scene
        );
        return scene;
    };

    var createScene = function (scene) {
        BABYLON.SceneLoader.ImportMesh(
            undefined,
            "",
            file_glb,/////////////change the model here//////////////////////////////////
            scene,
            function (
                meshes,
                particleSystems,
                skeletons,
                animationList
            ) {
                //ENV
                new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
                var envTexture = new BABYLON.HDRCubeTexture("/assets/hdr/background2.hdr", scene, 10, false, false, false, true);
                scene.createDefaultSkybox(envTexture, true, 0);
                scene.activeCamera.attachControl(canvas, false);

                //model box
                let mbox = new BABYLON.Mesh.CreateBox("mbox", 2, scene);
                let mat = new BABYLON.StandardMaterial("mat", scene);
                mat.alpha = 0;
                mbox.material = mat;
                mbox.enableEdgesRendering();
                mbox.edgesWidth = 1;
                mbox.edgesColor = new BABYLON.Color4(1, 0, 1, 0.5);

                //model
                var model = meshes[0];
                let childMeshes = model.getChildMeshes();
                let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
                let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
                for (let i = 0; i < childMeshes.length; i++) {
                    let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
                    let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
                    min = BABYLON.Vector3.Minimize(min, meshMin);
                    max = BABYLON.Vector3.Maximize(max, meshMax);
                }
                model.setBoundingInfo(new BABYLON.BoundingInfo(min, max));
                scene.getBoundingBoxRenderer().backColor.set(0, 1, 0);
                scene.getBoundingBoxRenderer().frontColor.set(0, 1, 0);
                model.showBoundingBox = false;

                //click for bounding box
                var bounds_switch = false
                scene.onPointerObservable.add(function (evt) {
                    var mod = evt.pickInfo.pickedMesh
                    if (mod) {
                        if (bounds_switch === true) {
                            model.showBoundingBox = false;
                            bounds_switch = false
                            //console.log('hit off')
                        } else if (bounds_switch === false) {
                            model.showBoundingBox = true;
                            bounds_switch = true
                            //console.log('hit on')
                        }
                    }
                }, BABYLON.PointerEventTypes.POINTERUP);

                //scale
                var posX = model.getBoundingInfo().boundingBox.extendSize._x
                var posY = model.getBoundingInfo().boundingBox.extendSize._y
                var posZ = model.getBoundingInfo().boundingBox.extendSize._z
                const findsize = [posX, posY, posZ]
                let biggest = 1 / Math.max(...findsize)
                //if (biggest == posY){
                //    biggest = 0.5 / biggest
                //}else{
                //    biggest = 1 / biggest
                //}
                model.scaling = new BABYLON.Vector3(biggest, biggest, biggest)
                if(findsize[1] <= findsize[0] && findsize[2]){
                var height2 = model.getBoundingInfo().boundingBox.extendSizeWorld._y
                if (height2 <= 0.5) {
                    model.scaling = new BABYLON.Vector3(biggest * 2, biggest * 2, biggest * 2)
                }
                if (height2 <= 0.75 && height2 > 0.5) {
                    model.scaling = new BABYLON.Vector3(biggest * 1.5, biggest * 1.5, biggest * 1.5)
                }
            }
                model.computeWorldMatrix(true)

                //position
                var centX = model.getBoundingInfo().boundingBox.centerWorld._x *= -1;
                var centY = model.getBoundingInfo().boundingBox.centerWorld._y *= -1;
                var centZ = model.getBoundingInfo().boundingBox.centerWorld._z *= -1;
                model.position = new BABYLON.Vector3(centX, centY, centZ);

                ///////////////////DOWNLOAD DOWNLOAD DOWNLOAD
                model.bakeTransformIntoVertices(model.computeWorldMatrix(true));
                model.bakeTransformIntoVertices();
                mbox.dispose();

                var upload_button = document.getElementById('upload_button')
                upload_button.addEventListener("click", function () {
                    model.showBoundingBox = false;
                    scene.getMeshByName('hdrSkyBox').dispose()
                    mbox.dispose();
                    DownLoad(scene, mbox)
                });

            }
        );
        return scene;
    };

    engine = createDefaultEngine();
    if (!engine) throw 'engine should not be null.';
    scene = createDefaultScene();
    scene = createScene(scene);
    sceneToRender = scene

    // Start rendering the scene based on the engine render loop.
    engine.runRenderLoop(function () {
        if (sceneToRender) {
            sceneToRender.render();


        }

    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });


    function DownLoad(scene) {
        let options = {
            includeCoordinateSystemConversionNodes: true
        };
        BABYLON.GLTF2Export.GLBAsync(scene, file_name, options).then((glb) => {
            glb.downloadFiles();
        })
    }

    scene.executeWhenReady(() => {
        console.log('Scene ready')

        setTimeout(() => {

            const canvas = document.getElementById('renderCanvas');
            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL();
            link.click();
            link.delete;

        }, 100);

    });
}


