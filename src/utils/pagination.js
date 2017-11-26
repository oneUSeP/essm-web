export default function getData (module) {
  if (module) {
    var data = module.get('data')
  }

  return data
}
