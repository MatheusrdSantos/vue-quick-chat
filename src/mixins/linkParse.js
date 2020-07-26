import linkifyElement from 'linkifyjs/element';
export default {
  props: {
    linkOptions: {
      type: Object,
      required: true
    }
  },
  mounted() {
    linkifyElement(this.$refs['message-content'], this.linkOptions, document)
  },
}