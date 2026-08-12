import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import CampoFormulario from './components/CampoFormulario';

export default function App() {
  const [formulario, setFormulario] = useState({
    nombreEquipo: '',
    nombreCapitan: '',
    email: '',
    telefono: '',
    categoria: '',
  });

  const actualizarCampo = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor,
    });
  };

  const validarEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const errores = {
    nombreEquipo:
      formulario.nombreEquipo.trim() === ''
        ? 'El nombre del equipo es obligatorio.'
        : formulario.nombreEquipo.trim().length < 3 ||
          formulario.nombreEquipo.trim().length > 20
        ? 'Debe tener entre 3 y 20 caracteres.'
        : '',

    nombreCapitan:
      formulario.nombreCapitan.trim() === ''
        ? 'El nombre del capitán es obligatorio.'
        : '',

    email:
      formulario.email.trim() === ''
        ? 'El email es obligatorio.'
        : !validarEmail(formulario.email.trim())
        ? 'Ingresá un email válido.'
        : '',

    telefono:
      formulario.telefono.trim() === ''
        ? 'El teléfono es obligatorio.'
        : !/^[0-9]{10}$/.test(formulario.telefono.trim())
        ? 'El teléfono debe tener exactamente 10 números.'
        : '',

    categoria:
      formulario.categoria.trim() === ''
        ? 'Seleccioná una categoría.'
        : '',
  };

  const hayErrores = Object.values(errores).some(
    (error) => error !== ''
  );

  const confirmarInscripcion = () => {
    if (hayErrores) {
      return;
    }

    Alert.alert(
      'Inscripción confirmada',
      `El equipo ${formulario.nombreEquipo} fue inscripto correctamente.`
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>
            Inscripción al torneo
          </Text>

          <Text style={styles.subtitulo}>
            Torneo de e-sports - Valorant
          </Text>

          <CampoFormulario
            label="Nombre del equipo"
            value={formulario.nombreEquipo}
            onChangeText={(texto) =>
              actualizarCampo('nombreEquipo', texto)
            }
            placeholder="Ej: Los Invencibles"
            keyboardType="default"
            error={errores.nombreEquipo}
          />

          <CampoFormulario
            label="Nombre del capitán"
            value={formulario.nombreCapitan}
            onChangeText={(texto) =>
              actualizarCampo('nombreCapitan', texto)
            }
            placeholder="Ej: Lucas Dorin"
            keyboardType="default"
            error={errores.nombreCapitan}
          />

          <CampoFormulario
            label="Email"
            value={formulario.email}
            onChangeText={(texto) =>
              actualizarCampo('email', texto)
            }
            placeholder="Ej: equipo@gmail.com"
            keyboardType="email-address"
            error={errores.email}
          />

          <CampoFormulario
            label="Teléfono"
            value={formulario.telefono}
            onChangeText={(texto) =>
              actualizarCampo('telefono', texto)
            }
            placeholder="Ej: 1123456789"
            keyboardType="phone-pad"
            error={errores.telefono}
          />

          <View style={styles.categoriaContainer}>
            <Text style={styles.label}>Categoría</Text>

            <View style={styles.botonesCategoria}>
              <TouchableOpacity
                style={[
                  styles.botonCategoria,
                  formulario.categoria === 'Sub-16'
                    ? styles.botonSeleccionado
                    : null,
                ]}
                onPress={() =>
                  actualizarCampo('categoria', 'Sub-16')
                }
              >
                <Text
                  style={[
                    styles.textoCategoria,
                    formulario.categoria === 'Sub-16'
                      ? styles.textoSeleccionado
                      : null,
                  ]}
                >
                  Sub-16
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botonCategoria,
                  formulario.categoria === 'Libre'
                    ? styles.botonSeleccionado
                    : null,
                ]}
                onPress={() =>
                  actualizarCampo('categoria', 'Libre')
                }
              >
                <Text
                  style={[
                    styles.textoCategoria,
                    formulario.categoria === 'Libre'
                      ? styles.textoSeleccionado
                      : null,
                  ]}
                >
                  Libre
                </Text>
              </TouchableOpacity>
            </View>

            {errores.categoria ? (
              <Text style={styles.error}>
                {errores.categoria}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.botonConfirmar,
              hayErrores ? styles.botonDeshabilitado : null,
            ]}
            onPress={confirmarInscripcion}
            disabled={hayErrores}
          >
            <Text style={styles.textoConfirmar}>
              Confirmar inscripción
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    padding: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },

  categoriaContainer: {
    marginBottom: 20,
  },

  botonesCategoria: {
    flexDirection: 'row',
    gap: 10,
  },

  botonCategoria: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 13,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  botonSeleccionado: {
    backgroundColor: '#222',
    borderColor: '#222',
  },

  textoCategoria: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  textoSeleccionado: {
    color: '#fff',
  },

  error: {
    color: '#d32f2f',
    marginTop: 5,
    fontSize: 14,
  },

  botonConfirmar: {
    backgroundColor: '#1565c0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  botonDeshabilitado: {
    backgroundColor: '#aaa',
  },

  textoConfirmar: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});