#mediapipe shit. I have no motivation to deal with svelte now.
'''
me notes:

Origin be top left corner
+  is left and down

'''

import cv2
import time
import mediapipe as mp

mp_holistic = mp.solutions.holistic

cap = cv2.VideoCapture(0) #caps from cam 0 i believe
ptime = 0


model_path = "models\efficientdet_lite0.tflite"
BaseOptions = mp.tasks.BaseOptions
ObjectDetector = mp.tasks.vision.ObjectDetector
ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

options = ObjectDetectorOptions(
    base_options=BaseOptions(model_asset_path=model_path),
    max_results=5,
    running_mode=VisionRunningMode.IMAGE)

with ObjectDetector.create_from_options(options) as detector:
    while True:
        success, img = cap.read() 
        
        # ctime = time.time()
        # fps = 1/(ctime-ptime)
        # ptime = ctime
        # cv2.putText(img, str(int(fps)), (70, 50))

        #apparently it be a np array
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img)
        detection_result = detector.detect(mp_image)
        for detection in detection_result.detections:
            if detection.categories[0].category_name == "person":
                x = detection.bounding_box.origin_x
                y = detection.bounding_box.origin_y
                w = detection.bounding_box.width
                h = detection.bounding_box.height

                cv2.rectangle(img,(x,y), (x + w, y + h), (0,255,0), 2) #2 = THICKNESS
                cv2.putText(img, "Person detected!", (x,y-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
            
        cv2.imshow("image", img)
        cv2.waitKey(1) 