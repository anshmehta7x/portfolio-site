import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useState } from "react";
import { a } from "@react-spring/three";

export function PlayerModel(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(100);

  //set position of model on canvas

  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/red_-_pokemon.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions["rig|rigAction"];
    if (action) {
      if (props.isMoving) {
        if (action.time < 2.5) {
          action.reset();
          action.time = 2.5;
        }
        action.play();
      } else {
        action.stop();
      }
    } else {
    }
  }, [props.isMoving, actions]);

  return (
    <a.group ref={group} {...props} dispose={null} scale={0.75}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
        >
          <group
            name="1808ed5f499448fcba2eef1b748308dbfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Body"
                  position={[0, 551.516, -2.912]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="char_grp"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="rig">
                    <group name="Object_7">
                      <primitive object={nodes._rootJoint} />
                      <skinnedMesh
                        name="Object_10"
                        geometry={nodes.Object_10.geometry}
                        material={materials.Skin}
                        skeleton={nodes.Object_10.skeleton}
                      />
                      <skinnedMesh
                        name="Object_11"
                        geometry={nodes.Object_11.geometry}
                        material={materials.Outline}
                        skeleton={nodes.Object_11.skeleton}
                      />
                      <skinnedMesh
                        name="Object_495"
                        geometry={nodes.Object_495.geometry}
                        material={materials.Cloth__etc}
                        skeleton={nodes.Object_495.skeleton}
                      />
                      <skinnedMesh
                        name="Object_496"
                        geometry={nodes.Object_496.geometry}
                        material={materials.Outline}
                        skeleton={nodes.Object_496.skeleton}
                      />
                      <skinnedMesh
                        name="Object_498"
                        geometry={nodes.Object_498.geometry}
                        material={materials.Hair}
                        skeleton={nodes.Object_498.skeleton}
                      />
                      <skinnedMesh
                        name="Object_499"
                        geometry={nodes.Object_499.geometry}
                        material={materials.Outline}
                        skeleton={nodes.Object_499.skeleton}
                      />
                      <group
                        name="Object_9"
                        position={[0, 551.516, -2.912]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                      />
                      <group
                        name="Object_494"
                        position={[0, 357.603, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                      />
                      <group
                        name="Object_497"
                        position={[1.147, 559.074, 44.727]}
                        rotation={[-3.071, 0.044, 0.557]}
                        scale={100}
                      />
                    </group>
                  </group>
                  <group name="cs_grp">
                    <group
                      name="cs_eyelid2"
                      position={[-1.788, 0.165, -0.029]}
                      scale={0.098}
                    />
                    <group
                      name="cs_jaw_square"
                      position={[2.907, -0.044, 0.461]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.283}
                    />
                    <group
                      name="cs_half_circle"
                      position={[0.03, -0.053, -0.087]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.069}
                    />
                    <group
                      name="cs_shoulderr"
                      position={[-0.708, -0.053, 0.672]}
                      rotation={[0, 0, Math.PI / 2]}
                      scale={0.085}
                    />
                    <group
                      name="cs_shoulderl"
                      position={[-0.532, -0.053, 0.672]}
                      rotation={[0, 0, Math.PI / 2]}
                      scale={0.085}
                    />
                    <group
                      name="cs_square"
                      position={[-5.737, -0.053, 0.822]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_base_finger_end"
                      position={[-2.89, -0.053, -0.157]}
                      scale={0.098}
                    />
                    <group
                      name="cs_base_finger"
                      position={[-2.67, -0.053, -0.157]}
                      scale={0.098}
                    />
                    <group
                      name="cs_circle_head"
                      position={[-5.032, -0.381, 0.81]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.074}
                    />
                    <group
                      name="cs_semi_sphere_inv"
                      position={[-0.615, -0.053, 0.472]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.085}
                    />
                    <group
                      name="cs_semi_sphere"
                      position={[-0.648, -0.053, 0.472]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.085}
                    />
                    <group name="cs_fist" position={[7.973, 0, 0]} />
                    <group
                      name="cs_ctrl_ik_solid_blue"
                      position={[5.16, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_ctrl_ik_solid_red"
                      position={[4.963, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_c_eye_offset"
                      position={[-1.617, -0.053, 0.174]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_pupil_blue"
                      position={[4.722, -0.053, -0.515]}
                      rotation={[0, 0, Math.PI]}
                      scale={0.208}
                    />
                    <group
                      name="cs_solid_pupil_red"
                      position={[4.483, -0.053, -0.515]}
                      rotation={[0, 0, Math.PI]}
                      scale={0.215}
                    />
                    <group
                      name="cs_solid_eye_red"
                      position={[3.917, -0.053, -0.515]}
                      rotation={[0, 0, Math.PI]}
                      scale={0.215}
                    />
                    <group
                      name="cs_solid_eye_blue"
                      position={[4.156, -0.053, -0.515]}
                      rotation={[0, 0, Math.PI]}
                      scale={0.208}
                    />
                    <group
                      name="cs_user_c_thigh_fkr"
                      position={[4.963, -0.067, -0.508]}
                    />
                    <group
                      name="cs_user_c_thigh_fkl"
                      position={[0.126, -0.001, 0.772]}
                      rotation={[-1.629, 0.01, -0.175]}
                      scale={0.415}
                    />
                    <group
                      name="cs_user_c_leg_fkr"
                      position={[2.476, 0.051, 0.479]}
                    />
                    <group
                      name="cs_user_c_leg_fkl"
                      position={[0.169, -0.015, 0.528]}
                      rotation={[-0.883, 1.317, -0.642]}
                      scale={0.475}
                    />
                    <group
                      name="cs_spine"
                      position={[0, -0.006, 1.075]}
                      rotation={[Math.PI / 2, -0.007, 0]}
                      scale={0.05}
                    />
                    <group
                      name="cs_hand"
                      position={[2.476, 0.051, 0.479]}
                      scale={0.098}
                    />
                    <group
                      name="cs_cube_03"
                      position={[-4.468, -0.381, 0.673]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.074}
                    />
                    <group
                      name="cs_box_head"
                      position={[-3.901, -0.381, 0.81]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.074}
                    />
                    <group
                      name="cs_cube_02"
                      position={[-3.443, -0.381, 0.873]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.074}
                    />
                    <group
                      name="cs_box"
                      position={[-2.347, -0.053, -0.16]}
                      scale={0.702}
                    />
                    <group
                      name="cs_foot_roll"
                      position={[-1.409, -0.053, -0.157]}
                      scale={0.098}
                    />
                    <group
                      name="cs_footl"
                      position={[1.967, -0.053, 0.472]}
                      scale={0.098}
                    />
                    <group
                      name="cs_jaw"
                      position={[2.449, -0.044, 0.461]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.283}
                    />
                    <group
                      name="cs_cube"
                      position={[-2.803, -0.515, 0.863]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.192}
                    />
                    <group
                      name="cs_cheek_inflate"
                      position={[0.531, -0.053, 0.117]}
                      scale={0.098}
                    />
                    <group
                      name="cs_wire_eyebrow"
                      position={[3.566, -0.046, -0.46]}
                      scale={0.25}
                    />
                    <group
                      name="cs_solid_eyebrow_red"
                      position={[3.081, -0.046, -0.46]}
                      scale={0.25}
                    />
                    <group
                      name="cs_solid_eyebrow_blue"
                      position={[2.679, -0.046, -0.46]}
                      scale={0.25}
                    />
                    <group
                      name="cs_footr"
                      position={[2.067, -0.053, 0.472]}
                      scale={0.098}
                    />
                    <group
                      name="cs_c_eyelid_micro"
                      position={[-1.961, -0.053, 0.174]}
                      scale={0.098}
                    />
                    <group
                      name="cs_arrow_03"
                      position={[1.228, -0.044, 0.037]}
                      scale={0.283}
                    />
                    <group
                      name="cs_pos"
                      position={[-2.074, -0.053, 0.822]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_curve"
                      position={[0.422, -0.053, 0.515]}
                      scale={0.098}
                    />
                    <group
                      name="cs_arrow_cross"
                      position={[2.082, -0.044, 0.037]}
                      scale={0.283}
                    />
                    <group
                      name="cs_plane_5"
                      position={[0.803, -0.053, 0.001]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_fk"
                      position={[-1.602, -0.053, 0.822]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_foot_fk"
                      position={[-0.083, -0.053, 0.285]}
                      scale={0.098}
                    />
                    <group
                      name="cs_eyelid"
                      position={[-1.785, -0.053, 0.071]}
                      scale={0.098}
                    />
                    <group
                      name="cs_c_eye"
                      position={[-1.785, -0.053, 0.174]}
                      scale={0.098}
                    />
                    <group
                      name="cs_arrow"
                      position={[1.025, -0.044, 0.037]}
                      scale={0.283}
                    />
                    <group
                      name="cs_arrow_02"
                      position={[1.328, -0.044, 0.037]}
                      scale={0.283}
                    />
                    <group
                      name="cs_circle_ik"
                      position={[-0.267, -0.053, -0.113]}
                      rotation={[Math.PI / 2, -1.571, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_plane_4_fill"
                      position={[1.338, -0.053, 0.506]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_04_rot2"
                      position={[-0.689, -0.053, -0.16]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_04_rot"
                      position={[-0.772, -0.053, -0.15]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_05"
                      position={[-0.943, -0.053, -0.16]}
                      scale={0.098}
                    />
                    <group
                      name="cs_triangle_02"
                      position={[0.213, -0.053, 0.948]}
                      rotation={[0, 0, 1.743]}
                      scale={0.172}
                    />
                    <group
                      name="cs_triangle"
                      position={[-0.166, -0.053, 0.935]}
                      rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                      scale={0.225}
                    />
                    <group
                      name="cs_plane_4"
                      position={[0.846, -0.053, 0.501]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_circle_squashed"
                      position={[0.531, -0.053, -0.061]}
                      scale={0.098}
                    />
                    <group
                      name="cs_yeux"
                      position={[-1.039, -0.053, 0.462]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_plane_3"
                      position={[0.643, -0.053, 0.001]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_plane_2"
                      position={[-1.064, -0.053, 0.822]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_circle_01"
                      position={[0.03, -0.053, -0.087]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_circle_02"
                      position={[0.33, -0.053, -0.078]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_plane_1"
                      position={[0.422, -0.053, 0.285]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_04"
                      position={[-1.265, -0.053, -0.157]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_02"
                      position={[-0.84, -0.053, 0.164]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_03"
                      position={[-0.259, -0.053, 0.156]}
                      scale={0.098}
                    />
                    <group
                      name="cs_torus_01"
                      position={[-1.25, -0.053, 0.174]}
                      scale={0.098}
                    />
                    <group
                      name="cs_sphere"
                      position={[-0.848, -0.053, 0.472]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.085}
                    />
                    <group
                      name="cs_sphere_dir2"
                      position={[-0.746, -0.053, 0.473]}
                      scale={0.094}
                    />
                    <group
                      name="cs_sphere_dir1"
                      position={[-0.548, -0.053, 0.477]}
                      scale={0.085}
                    />
                    <group
                      name="cs_arrow_twist"
                      position={[5.246, -0.046, 0.308]}
                    />
                    <group
                      name="cs_arrow_cross_solid"
                      position={[-1.203, -0.044, -1.334]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.084}
                    />
                    <group
                      name="cs_pos_solid_eye_offset_blue"
                      position={[-2.583, -0.053, -1.292]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.245}
                    />
                    <group
                      name="cs_pos_solid_eye_offset_red"
                      position={[-3.083, -0.053, -1.292]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.245}
                    />
                    <group
                      name="cs_solid_arrow_twist_blue"
                      position={[2.266, -0.046, -0.46]}
                      scale={0.25}
                    />
                    <group
                      name="cs_solid_arrow_twist_red"
                      position={[1.859, -0.046, -0.46]}
                      scale={0.25}
                    />
                    <group
                      name="cs_solid_bar_01"
                      position={[-1.916, -0.053, -0.498]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_bar_blue"
                      position={[-6.034, -0.231, -0.422]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_bar_red"
                      position={[-4.874, -0.053, -0.498]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_circle_01"
                      position={[0.03, -0.053, -0.515]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_circle_02"
                      position={[0.524, -0.053, -0.515]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_circle_02_blue"
                      position={[0.876, -0.053, -0.515]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_circle_02_green"
                      position={[0.326, -0.053, -0.515]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_circle_02_red"
                      position={[0.7, -0.053, -0.515]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_circle_ik_blue"
                      position={[-4.072, -0.053, -0.482]}
                      rotation={[-Math.PI / 2, -1.571, 0]}
                      scale={0.133}
                    />
                    <group
                      name="cs_solid_circle_ik_red"
                      position={[-3.226, -0.053, -0.482]}
                      rotation={[-Math.PI / 2, -1.571, 0]}
                      scale={0.133}
                    />
                    <group
                      name="cs_solid_circle_squashed_blue"
                      position={[0.102, -0.598, -1.152]}
                      scale={0.374}
                    />
                    <group
                      name="cs_solid_circle_squashed_green"
                      position={[-0.429, -0.598, -1.152]}
                      scale={0.374}
                    />
                    <group
                      name="cs_solid_circle_squashed_red"
                      position={[0.65, -0.598, -1.152]}
                      scale={0.374}
                    />
                    <group
                      name="cs_solid_fk_blue"
                      position={[-3.712, -0.053, -0.483]}
                      rotation={[Math.PI / 2, 0, -Math.PI]}
                      scale={0.062}
                    />
                    <group
                      name="cs_solid_fk_red"
                      position={[-2.867, -0.053, -0.483]}
                      rotation={[Math.PI / 2, 0, -Math.PI]}
                      scale={0.062}
                    />
                    <group
                      name="cs_solid_plane_2"
                      position={[-1.176, -0.053, -0.498]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.054}
                    />
                    <group
                      name="cs_solid_plane_2_blue"
                      position={[-0.633, -0.053, -0.498]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.054}
                    />
                    <group
                      name="cs_solid_plane_2_red"
                      position={[-0.891, -0.053, -0.498]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.054}
                    />
                    <group
                      name="cs_solid_plane_3"
                      position={[0.977, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_solid_plane_3_blue"
                      position={[1.362, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_solid_plane_3_red"
                      position={[1.153, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_solid_plane_5_blue"
                      position={[1.609, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_solid_plane_5_red"
                      position={[1.523, -0.053, -0.508]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.055}
                    />
                    <group
                      name="cs_solid_torus_04_blue"
                      position={[-2.533, -0.053, -0.478]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_torus_04_red"
                      position={[-2.606, -0.053, -0.478]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_torus_blue"
                      position={[-3.844, -0.053, -1.279]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_torus_green"
                      position={[-4.087, -0.053, -1.279]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_torus_red"
                      position={[-3.602, -0.053, -1.279]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_triangle"
                      position={[-0.277, -0.053, -0.474]}
                      rotation={[Math.PI / 2, -1.571, 0]}
                      scale={0.225}
                    />
                    <group
                      name="cs_pos_solid"
                      position={[-2.074, -0.053, -1.292]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_eye_aim_blue"
                      position={[-1.964, -0.053, -0.042]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_eye_aim_global"
                      position={[-1.845, -0.053, -0.087]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_solid_eye_aim_red"
                      position={[-2.082, -0.053, -0.042]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_eye_aim"
                      position={[-1.554, -0.053, -0.087]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_eye_aim_global"
                      position={[-1.715, -0.053, -0.087]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.098}
                    />
                    <group
                      name="cs_user_c_skull_01x"
                      position={[0, -0.019, 1.575]}
                      rotation={[-Math.PI / 2, 1.571, 0]}
                      scale={0.058}
                    />
                    <group
                      name="cs_user_c_shoulderl"
                      position={[0.078, -0.064, 1.396]}
                      rotation={[-Math.PI, 0, -1.538]}
                      scale={0.081}
                    />
                    <group
                      name="cs_user_c_shoulderr"
                      position={[-1.73, 0.125, 0.128]}
                    />
                    <group
                      name="cs_user_c_skull_02x"
                      position={[0, -0.019, 1.575]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.053}
                    />
                    <group
                      name="cs_user_c_skull_03x"
                      position={[0, -0.019, 1.669]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.065}
                    />
                    <group
                      name="cs_twist_shape"
                      position={[-0.476, -0.053, 0.156]}
                      scale={0.098}
                    />
                    <group name="cs_torus_tip_01" position={[-0.992, 0, 0]} />
                    <group name="cs_wavy_circle" position={[6.982, 0, 0]} />
                    <group
                      name="cs_arrow_x_up"
                      position={[1.025, -0.135, 0.037]}
                      scale={0.283}
                    />
                    <group
                      name="cs_arrow_x_down"
                      position={[1.025, -0.238, 0.037]}
                      scale={0.283}
                    />
                    <group
                      name="cs_c_foot_ik_offset"
                      rotation={[-Math.PI, -Math.PI / 2, 0]}
                      scale={0.112}
                    />
                    <group
                      name="cs_fly"
                      position={[3.682, -0.044, 0.037]}
                      scale={0.283}
                    />
                    <group name="cs_cube_solid" position={[-3.953, 0, 0]} />
                    <group
                      name="cs_cube_solid_offset"
                      position={[-4.354, 0, 0]}
                    />
                    <group
                      name="cs_sphere_offset"
                      position={[-0.848, -0.053, 0.556]}
                      rotation={[Math.PI / 2, 0, 0]}
                      scale={0.085}
                    />
                    <group
                      name="cs_sphere_solid_offset"
                      position={[-5.18, 0, 0]}
                    />
                    <group name="cs_box_offset" position={[-5.754, 0, 0]} />
                    <group name="cs_sphere_solid" position={[-4.745, 0, 0]} />
                    <group
                      name="cs_user_c_arm_fkl"
                      position={[0.237, 0.026, 1.294]}
                      rotation={[3.113, -0.368, -1.683]}
                      scale={0.229}
                    />
                    <group
                      name="cs_user_c_arm_fkr"
                      position={[0.131, 0.015, 1.335]}
                    />
                    <group
                      name="cs_user_c_arm_ikr"
                      position={[0.131, 0.015, 1.335]}
                    />
                  </group>
                </group>
                <group
                  name="Cube007"
                  position={[0, 357.603, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="Hair"
                  position={[1.147, 559.074, 44.727]}
                  rotation={[-3.071, 0.044, 0.557]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}

useGLTF.preload("/red_-_pokemon.glb");
