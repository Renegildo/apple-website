import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import { RefObject, Suspense } from "react";
import IPhone from "./IPhone";
import Loader from "./Loader";

interface Model {
  title: string;
  color: string[];
  img: string;
}

const ModelView = ({
  item,
  size,
  controlRef,
  setRotationState,
  gsapType,
  index,
  groupRef,
}: {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: string;
  controlRef: RefObject<any>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: Model;
  size: string;
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-150%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current?.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={
              index === 1
                ? new THREE.Vector3(15, 15, 15)
                : new THREE.Vector3(17, 17, 17)
            }
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
